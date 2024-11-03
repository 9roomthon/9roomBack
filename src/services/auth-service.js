const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const axios = require('axios');

exports.getGoogleUserDataFromAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = response.data;

    let user = await User.findOne({
      where: { googleId: userData.id },
    });

    if (!user) {
      user = User.create({
        googleId: userData.id,
        email: userData.email,
        name: userData.name,
        accessToken: accessToken,
      });
    } else {
      await user.update({ accessToken });
    }

    const jwtToken = exports.createJwtToken(user);

    return {
      user,
      jwtToken,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createJwtToken = (user) => {
  const payload = { userId: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
