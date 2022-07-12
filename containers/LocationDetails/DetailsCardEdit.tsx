import { Form, FormikProvider, getIn, useFormik } from 'formik';
import { ChargingLocation } from '@/api/types';
import TextField from '@/components/TextField';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { AllCountries } from '@/constants';
import { LocationSchema } from '@/schemas';
import * as S from './styles';

interface DetailsCardEditProps {
  location: ChargingLocation;
  onCancel: () => void;
}

const DetailsCardEdit = ({ location, onCancel }: DetailsCardEditProps) => {
  const { chargers, ...initialValues } = location;

  const formik = useFormik({
    initialValues,
    validationSchema: LocationSchema,
    onSubmit: () => {
      //
    },
  });

  const { getFieldProps, touched, errors, isSubmitting } = formik;

  const getErrorProps = (name: string) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);

    return {
      error: Boolean(touch && error),
      errorMessage: touch && error ? error : undefined,
    };
  };

  return (
    <S.StyledDetailsCard>
      <FormikProvider value={formik}>
        <Form noValidate>
          <S.CardStack>
            <TextField
              label="Name"
              color="secondary"
              disabled={isSubmitting}
              {...getFieldProps('name')}
              {...getErrorProps('name')}
            />
            <TextField
              label="Location"
              color="secondary"
              disabled={isSubmitting}
              {...getFieldProps('location')}
              {...getErrorProps('location')}
            />
          </S.CardStack>
          <S.CardStack>
            <TextField
              label="Postal Code"
              color="secondary"
              disabled={isSubmitting}
              {...getFieldProps('postalCode')}
              {...getErrorProps('postalCode')}
            />
            <Select
              label="Country"
              options={AllCountries}
              color="secondary"
              disabled={isSubmitting}
              {...getFieldProps('country')}
              {...getErrorProps('country')}
            />
          </S.CardStack>
          <S.CardAction>
            <Button
              type="button"
              variant="outlined"
              color="error"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button type="submit" color="secondary" loading={isSubmitting}>
              Save
            </Button>
          </S.CardAction>
        </Form>
      </FormikProvider>
    </S.StyledDetailsCard>
  );
};

export default DetailsCardEdit;
