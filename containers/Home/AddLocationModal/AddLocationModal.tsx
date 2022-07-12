import { FieldArray, Form, FormikProvider, getIn, useFormik } from 'formik';
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
import * as S from './styles';

interface AddLocationModalProps
  extends Omit<ModalProps, 'title' | 'children'> {}

const AddLocationModal = ({ open, setOpen }: AddLocationModalProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      postalCode: '',
      country: 'NL',
      chargers: [],
    },
    validationSchema: LocationSchema,
    onSubmit: values => {
      console.log(values);
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
              {...getFieldProps('name')}
              {...getErrorProps('name')}
            />
            <TextField
              label="Location"
              color="secondary"
              {...getFieldProps('location')}
              {...getErrorProps('location')}
            />
          </S.FormStack>
          <S.FormStack>
            <TextField
              label="Postal Code"
              color="secondary"
              {...getFieldProps('postalCode')}
              {...getErrorProps('postalCode')}
            />
            <Select
              label="Country"
              color="secondary"
              options={AllCountries}
              {...getFieldProps('country')}
              {...getErrorProps('country')}
            />
          </S.FormStack>

          {!!values.chargers.length && (
            <Typography variant="subtitle2">Chargers</Typography>
          )}

          <FieldArray
            name="chargers"
            render={({ remove, push }) => (
              <>
                {values.chargers.map((_, index) => {
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
                          options={ChargerTypes}
                          {...getFieldProps(`chargers.${index}.type`)}
                          {...getErrorProps(`chargers.${index}.type`)}
                        />
                        <Select
                          label="Status"
                          color="secondary"
                          options={ChargerStatusesList}
                          {...getFieldProps(`chargers.${index}.status`)}
                          {...getErrorProps(`chargers.${index}.status`)}
                        />
                      </S.FormStack>
                      <TextField
                        label="Serial Number"
                        color="secondary"
                        fullWidth
                        {...getFieldProps(`chargers.${index}.serialNumber`)}
                        {...getErrorProps(`chargers.${index}.serialNumber`)}
                      />
                    </S.StyledChargerMiniForm>
                  );
                })}
                <S.AddChargerButton
                  type="button"
                  variant="text"
                  onClick={() => {
                    push({ type: '', status: '', serialNumber: '' });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                  {values.chargers.length > 0 && ' another'} charger
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
              disabled={isSubmitting}
            >
              Clear All
            </Button>
            <Button
              type="submit"
              color="secondary"
              size="large"
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
