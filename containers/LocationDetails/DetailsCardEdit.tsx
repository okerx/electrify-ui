import { Form, FormikProvider, getIn, useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { APIError, ChargingLocation, CreateLocationParams } from '@/api/types';
import TextField from '@/components/TextField';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { AllCountries } from '@/constants';
import { LocationSchema } from '@/schemas';
import { handleError, updateChargingLocation } from '@/api';
import * as S from './styles';

interface DetailsCardEditProps {
  location?: ChargingLocation;
  onCancel: () => void;
}

const DetailsCardEdit = ({ location, onCancel }: DetailsCardEditProps) => {
  const { chargers, ...initialValues } = location || {};

  const queryClient = useQueryClient();

  const mutation = useMutation<
    ChargingLocation,
    APIError,
    Omit<CreateLocationParams, 'chargers'>
  >(params => updateChargingLocation(location?.id as string, params), {
    onSuccess: data => {
      queryClient.setQueryData(['locationDetails', data.id], data);
    },
    onError: handleError,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LocationSchema,
    onSubmit: async values => {
      await mutation.mutateAsync(values);
      return onCancel();
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
