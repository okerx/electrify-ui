import toast from 'react-hot-toast';

const toaster = {
  error: (msg: string) => toast.error(msg),
  success: (msg: string) => toast.success(msg),
};

export default toaster;
