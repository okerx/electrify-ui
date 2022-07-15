import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, FormikProvider, getIn, useFormik } from 'formik';
import Modal, { ModalProps } from '@/components/Modal';
import {
  APIError,
  Charger,
  ChargingLocation,
  CreateChargerParams,
} from '@/api/types';
import { ChargerSchema } from '@/schemas';
import { ChargerStatusesList, ChargerTypes } from '@/constants';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import * as S from './styles';
import { useMutation, useQueryClient } from 'react-query';
import { createCharger, handleError, updateCharger } from '@/api';

interface AddOrEditChargerModalProps extends Omit<ModalProps, 'children'> {
  chargerToEdit?: Charger | null;
  editModel?: boolean;
  locationId?: string;
}

const AddOrEditChargerModal = ({
  open,
  setOpen,
  ref,
  chargerToEdit,
  locationId,
  editModel = false,
  ...props
}: AddOrEditChargerModalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onCreateSuccess = useCallback(
    (charger: Charger) => {
      queryClient.setQueryData<ChargingLocation>(
        ['locationDetails', router.query.id],
        data => {
          return {
            id: data?.id as string,
            ...data,
            chargers: [charger, ...(data?.chargers || [])],
          };
        },
      );
    },
    [queryClient, router.query.id],
  );

  const onUpdateSuccess = useCallback(
    async (charger: Charger) => {
      await queryClient.setQueryData<ChargingLocation>(
        ['locationDetails', router.query.id],
        data => {
          return {
            id: data?.id as string,
            ...data,
            chargers: data?.chargers?.map(ch => {
              if (ch.id === charger.id) {
                return charger;
              }
              return ch;
            }),
          };
        },
      );
    },
    [queryClient, router.query.id],
  );

  const mutation = useMutation<Charger, APIError, CreateChargerParams, any>(
    params =>
      editModel
        ? updateCharger(chargerToEdit?.id as string, params)
        : createCharger(locationId as string, params),
    {
      onSuccess: editModel ? onUpdateSuccess : onCreateSuccess,
      onError: handleError,
    },
  );

  const initialValues: Omit<Charger, 'id'> = {
    type: 'HPC',
    serialNumber: '',
    status: 'CONNECTED',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ChargerSchema,
    onSubmit: async (values, { resetForm }) => {
      await mutation.mutateAsync(values);
      resetForm();
      return setOpen(false);
    },
  });

  const { errors, touched, getFieldProps, isSubmitting, setValues } = formik;

  useEffect(() => {
    if (chargerToEdit) {
      setValues(chargerToEdit);
    }
  }, [chargerToEdit, setValues]);

  const getErrorProps = (name: string) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);

    return {
      error: Boolean(touch && error),
      errorMessage: touch && error ? error : undefined,
    };
  };

  return (
    <Modal open={open} setOpen={setOpen} {...props}>
      <FormikProvider value={formik}>
        <Form noValidate>
          <S.FormStack>
            <Select
              label="Type"
              color="secondary"
              data-test-id="add-edit-charger-type-select"
              disabled={isSubmitting}
              options={ChargerTypes}
              {...getFieldProps('type')}
              {...getErrorProps('type')}
            />
            <Select
              label="Status"
              color="secondary"
              data-test-id="add-edit-charger-status-select"
              disabled={isSubmitting}
              options={ChargerStatusesList}
              {...getFieldProps('status')}
              {...getErrorProps('status')}
            />
          </S.FormStack>
          <TextField
            label="Serial Number"
            color="secondary"
            data-test-id="add-edit-charger-serialnumber-field"
            disabled={isSubmitting}
            fullWidth
            {...getFieldProps('serialNumber')}
            {...getErrorProps('serialNumber')}
          />
          <S.FormActions>
            <Button
              type="submit"
              color="secondary"
              data-test-id="add-edit-charger-submit-btn"
              loading={isSubmitting}
            >
              Save
            </Button>
          </S.FormActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddOrEditChargerModal;
