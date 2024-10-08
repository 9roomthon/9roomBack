const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authrization'];

  if (!token) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};
