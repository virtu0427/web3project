/**
 * Standard API Response Handler
 */
class ApiResponse {
  /**
   * Success response with data
   * @param {object} data - Response data
   * @param {object} pagination - Optional pagination info
   */
  static success(data, pagination = null) {
    const response = {
      status: 'success',
      data
    };

    if (pagination) {
      response.pagination = {
        currentPage: pagination.page,
        totalPages: pagination.totalPages,
        totalItems: pagination.total
      };
    }

    return response;
  }

  /**
   * Error response
   * @param {string} message - Error message
   * @param {string} code - Error code
   */
  static error(message, code = 'INTERNAL_SERVER_ERROR') {
    return {
      status: 'error',
      message,
      code
    };
  }
}

module.exports = ApiResponse;