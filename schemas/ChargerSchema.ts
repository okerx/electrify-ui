import * as Yup from 'yup';

const ChargerSchema = Yup.object().shape({
  type: Yup.string().required('Model is required'),
  status: Yup.string().required('Status is required'),
  serialNumber: Yup.string().required('Serial Number is required'),
});

export default ChargerSchema;
