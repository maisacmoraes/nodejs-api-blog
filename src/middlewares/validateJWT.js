const { verifyToken } = require('../auth/authfunctions');

const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) { 
      return res.status(401).json({ message: 'Token not found' });
    }

    const data = verifyToken(authorization);
    req.payload = data;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;
