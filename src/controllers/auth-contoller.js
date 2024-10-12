const authService = require('../services/auth-service');
const { StatusCodes } = require('http-status-codes');

exports.saveGoogleUser = async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'AccessToken is required',
      });
    }

    const { user, jwtToken } =
      await authService.getGoogleUserDataFromAccessToken(accessToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      user,
      token: jwtToken,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
