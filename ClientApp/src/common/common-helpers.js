import { toast } from 'react-toastify';

const defaultOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export class Notification {
  static showSuccess = function (message, options) {
    toast.success(message, {...defaultOptions, ...options});
  };
  static error = function (message, options) {
    toast.error(message, {...defaultOptions, ...options});
  };
}
