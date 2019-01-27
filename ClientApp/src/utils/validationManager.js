export default class ValidationManager {
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
