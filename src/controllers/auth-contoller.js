const authService = require('../services/auth-service');
const { StatusCodes } = require('http-status-codes');

exports.googleLogin = (req, res) => {
  const authUrl = authService.getGoogleAuthUrl();
  res.redirect(authUrl);
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const userData = await authService.getGoogleUserData(code);

    return res.status(StatusCodes.OK).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};
