import { useEffect } from 'react';
import { Form, FormikProvider, getIn, useFormik } from 'formik';
import Modal, { ModalProps } from '@/components/Modal';
import { Charger } from '@/api/types';
import { ChargerSchema } from '@/schemas';
import { ChargerStatusesList, ChargerTypes } from '@/constants';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import * as S from './styles';

interface AddOrEditChargerModalProps extends Omit<ModalProps, 'children'> {
  chargerToEdit?: Charger | null;
}

const AddOrEditChargerModal = ({
  open,
  setOpen,
  ref,
  chargerToEdit,
  ...props
}: AddOrEditChargerModalProps) => {
  const initialValues: Omit<Charger, 'id'> = {
    type: 'HPC',
    serialNumber: '',
    status: 'CONNECTED',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ChargerSchema,
    onSubmit: () => {
      //
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
              disabled={isSubmitting}
              options={ChargerTypes}
              {...getFieldProps('type')}
              {...getErrorProps('type')}
            />
            <Select
              label="Status"
              color="secondary"
              disabled={isSubmitting}
              options={ChargerStatusesList}
              {...getFieldProps('status')}
              {...getErrorProps('status')}
            />
          </S.FormStack>
          <TextField
            label="Serial Number"
            color="secondary"
            disabled={isSubmitting}
            fullWidth
            {...getFieldProps('serialNumber')}
            {...getErrorProps('serialNumber')}
          />
          <S.FormActions>
            <Button color="secondary" loading={isSubmitting}>
              Save
            </Button>
          </S.FormActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddOrEditChargerModal;
