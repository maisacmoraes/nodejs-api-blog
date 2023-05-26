const express = require('express');

const userRoutes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin, createUser } = require('../controllers');
const { validadeDisplayName, validateEmail, validatePassword } = require('../middlewares');

userRoutes.post('/login', createLogin);
userRoutes.post('/user', validadeDisplayName, validateEmail, validatePassword, createUser);

module.exports = userRoutes;