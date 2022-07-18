import { FieldArray, Form, FormikProvider, getIn, useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import Modal, { ModalProps } from '@/components/Modal';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import Select from '@/components/Select';
import { AllCountries, ChargerStatusesList, ChargerTypes } from '@/constants';
import { LocationSchema } from '@/schemas';
import { createLocation, handleClientError } from '@/api';
import {
  APIError,
  APIResponse,
  ChargingLocation,
  CreateLocationParams,
} from '@/api/types';
import * as S from './styles';
import { useRouter } from 'next/router';

interface AddLocationModalProps
  extends Omit<ModalProps, 'title' | 'children'> {}

const AddLocationModal = ({ open, setOpen }: AddLocationModalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    ChargingLocation,
    APIError,
    CreateLocationParams
  >(
    async params => {
      return await createLocation(params);
    },
    {
      onSuccess: async newLocation => {
        queryClient.setQueryData<APIResponse<ChargingLocation[]> | undefined>(
          ['locations', router.query],
          chargingLocations => {
            if (chargingLocations) {
              const { data, pagination } = chargingLocations;
              const isOverflow =
                data.length === parseInt(pagination?.perPage as string);
              const _data = isOverflow ? data.slice(0, -1) : data;
              return {
                ...chargingLocations,
                pagination: {
                  page: pagination?.page as string,
                  perPage: pagination?.perPage as string,
                  total: String(parseInt(pagination?.total as string, 10) + 1),
                },
                data: [newLocation, ..._data],
              };
            }

            return chargingLocations;
          },
        );
      },
      onError: handleClientError,
    },
  );

  const formik = useFormik<CreateLocationParams>({
    initialValues: {
      name: '',
      location: 0,
      postalCode: '',
      country: 'NLD',
      chargers: [],
    },
    validationSchema: LocationSchema,
    onSubmit: async (values, { resetForm }) => {
      await mutation.mutateAsync(values);
      resetForm();
      return setOpen(false);
    },
  });

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const getErrorProps = (name: string) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);

    return {
      error: Boolean(touch && error),
      errorMessage: touch && error ? error : undefined,
    };
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Add New Location">
      <FormikProvider value={formik}>
        <Form noValidate>
          <S.FormStack>
            <TextField
              label="Name"
              color="secondary"
              data-test-id="add-location-name-field"
              {...getFieldProps('name')}
              {...getErrorProps('name')}
            />
            <TextField
              label="Location"
              color="secondary"
              data-test-id="add-location-location-field"
              {...getFieldProps('location')}
              {...getErrorProps('location')}
            />
          </S.FormStack>
          <S.FormStack>
            <TextField
              label="Postal Code"
              color="secondary"
              data-test-id="add-location-postalcode-field"
              {...getFieldProps('postalCode')}
              {...getErrorProps('postalCode')}
            />
            <Select
              label="Country"
              color="secondary"
              data-test-id="add-location-country-select"
              options={AllCountries}
              {...getFieldProps('country')}
              {...getErrorProps('country')}
            />
          </S.FormStack>

          {!!values.chargers?.length && (
            <Typography variant="subtitle2">Chargers</Typography>
          )}

          <FieldArray
            name="chargers"
            render={({ remove, push }) => (
              <>
                {values.chargers?.map((_, index) => {
                  return (
                    <S.StyledChargerMiniForm key={index}>
                      <S.ChargerMiniFormCloseButton
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </S.ChargerMiniFormCloseButton>
                      <S.FormStack>
                        <Select
                          label="Type"
                          color="secondary"
                          data-test-id={`add-location-type-select-${index}`}
                          options={ChargerTypes}
                          {...getFieldProps(`chargers.${index}.type`)}
                          {...getErrorProps(`chargers.${index}.type`)}
                        />
                        <Select
                          label="Status"
                          color="secondary"
                          data-test-id={`add-location-status-select-${index}`}
                          options={ChargerStatusesList}
                          {...getFieldProps(`chargers.${index}.status`)}
                          {...getErrorProps(`chargers.${index}.status`)}
                        />
                      </S.FormStack>
                      <TextField
                        label="Serial Number"
                        color="secondary"
                        fullWidth
                        data-test-id={`add-location-serialnumber-field-${index}`}
                        {...getFieldProps(`chargers.${index}.serialNumber`)}
                        {...getErrorProps(`chargers.${index}.serialNumber`)}
                      />
                    </S.StyledChargerMiniForm>
                  );
                })}
                <S.AddChargerButton
                  type="button"
                  variant="text"
                  data-test-id="add-location-add-charger-btn"
                  onClick={() => {
                    push({
                      type: ChargerTypes[0],
                      status: ChargerStatusesList[0].value,
                      serialNumber: '',
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                  {values.chargers &&
                    values.chargers.length > 0 &&
                    ' another'}{' '}
                  charger
                </S.AddChargerButton>
              </>
            )}
          />

          <S.FormActions>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              size="large"
              data-test-id="add-location-clear-btn"
              disabled={isSubmitting}
            >
              Clear All
            </Button>
            <Button
              type="submit"
              color="secondary"
              size="large"
              data-test-id="add-location-submit-btn"
              loading={isSubmitting}
            >
              Add Location
            </Button>
          </S.FormActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddLocationModal;
