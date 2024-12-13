const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/response');
const ErrorCodes = require('../constants/errorCodes');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const tokens = await AuthService.register(username, email, password);
    
    res.status(201).json(ApiResponse.success({
      message: 'User registered successfully',
      ...tokens
    }));
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(400).json(ApiResponse.error(
        error.message,
        ErrorCodes.ALREADY_EXISTS
      ));
    }
    
    res.status(500).json(ApiResponse.error(
      'Error registering user',
      ErrorCodes.DATABASE_ERROR
    ));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await AuthService.login(email, password);
    
    res.json(ApiResponse.success(tokens));
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json(ApiResponse.error(
        error.message,
        ErrorCodes.INVALID_CREDENTIALS
      ));
    }
    
    res.status(500).json(ApiResponse.error(
      'Error logging in',
      ErrorCodes.DATABASE_ERROR
    ));
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await AuthService.refreshToken(refreshToken);
    
    res.json(ApiResponse.success(tokens));
  } catch (error) {
    res.status(401).json(ApiResponse.error(
      'Invalid refresh token',
      ErrorCodes.TOKEN_EXPIRED
    ));
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.userId;

    await AuthService.updateProfile(userId, username, email);
    res.json(ApiResponse.success({
      message: 'Profile updated successfully'
    }));
  } catch (error) {
    res.status(500).json(ApiResponse.error(
      'Error updating profile',
      ErrorCodes.DATABASE_ERROR
    ));
  }
};