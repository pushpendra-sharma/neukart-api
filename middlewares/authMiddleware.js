const jwt = require('jsonwebtoken');

function authVerify(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Provide a valid token');
    }

    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        throw new Error('Token has Expired');
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

function createAuthToken(payload) {
  return jwt.sign(payload, 'secret', {
    expiresIn: '1d',
  });
}

function setHeaderToken(req, res) {}

module.exports = {
  authVerify,
  createAuthToken,
};
