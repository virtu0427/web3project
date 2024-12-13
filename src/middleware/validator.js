const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/response');
const ErrorCodes = require('../constants/errorCodes');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
      ApiResponse.error(
        errors.array()[0].msg,
        ErrorCodes.INVALID_INPUT
      )
    );
  }
  next();
};