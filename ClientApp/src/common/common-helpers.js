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

export class Validation {
  static isBadResponseWithDetails = (response) => response
    && response.hasOwnProperty("error_code")
    && response.hasOwnProperty("details")
    && Array.isArray(response.details);

  static convertValidationDetailsFromArrayToObject = (details) =>
    details.reduce((acc, cur) => {
      acc[cur.field] = cur.error;
      return acc;
    }, {});
}
