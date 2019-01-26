import { toast } from 'react-toastify';

const defaultOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export class NotificationManager {
  static showSuccess = function(message, options) {
    toast.success(message, {...defaultOptions, ...options});
  };
  static showError = function(message, options) {
    toast.error(message, {...defaultOptions, ...options});
  };

  static requestPermissions = () => Notification && Notification.requestPermission();

  static pushNotification = function(message) {
    if (Notification && Notification.permission === 'granted') {
      const notification = new Notification(message);
      setTimeout(notification.close.bind(notification), 4000);
    }
  }
}

export class ValidationManager {
  static isSuccessfulResponse = (response) => response && response.hasOwnProperty("id");

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

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
