import * as Yup from 'yup';
import ChargerSchema from './ChargerSchema';

const LocationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Name is required'),
  location: Yup.number()
    .typeError('Location must be a number')
    .required('Location is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  country: Yup.string().required('Country is required'),
  chargers: Yup.array().of(ChargerSchema),
});

export default LocationSchema;
