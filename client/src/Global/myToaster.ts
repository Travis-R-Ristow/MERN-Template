import type { TypeOptions as TO } from 'react-toastify';
import { toast } from 'react-toastify';

const OPTIONS = {
  style: { marginRight: '1rem' }
};

type TypeOptions = Exclude<TO, 'default'>;
type ToastTypesProps = {
  [O in TypeOptions]: O;
};

export const ToastTypes: ToastTypesProps = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
};

type ToastType = (typeof ToastTypes)[keyof typeof ToastTypes];

export const pushToast = (message: string, type: ToastType = ToastTypes.success) =>
  toast[type](message, OPTIONS);
