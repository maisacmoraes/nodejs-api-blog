const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15D',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'seusegredodetoken';

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };
