const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // 오타 수정

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED) // 상태 코드 수정
      .json({ error: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    // Bearer token 분리
    if (err) {
      return res
        .status(StatusCodes.FORBIDDEN) // 상태 코드 수정
        .json({ error: 'Failed to authenticate token' });
    }

    req.user = { userId: decoded.userId }; // req.user에 정보 저장
    next();
  });
};
