const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

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
      where: { googleId: this.getGoogleUserDataFromAccessToken.id },
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

    const jwtToken = this.createJwtToken(user);

    return {
      user,
      jwtToken,
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch Google user info');
  }
};

exports.createJwtToken = (user) => {
  const payload = { userId: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
