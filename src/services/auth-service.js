const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);

exports.getGoogleAuthUrl = () => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'profile', 'email'],
    redirect_uri: process.env.REDIRECT_URI,
  });

  return authUrl;
};

exports.getGoogleUserData = async (code) => {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return {
    userId: payload['sub'],
    email: payload.email,
    name: payload.name,
  };
};
