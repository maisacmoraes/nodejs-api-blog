const express = require('express');

const userRoutes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin, createUser, getUsers } = require('../controllers');
const { validateJWT, validateDisplayName,
    validateEmail, validatePassword } = require('../middlewares');

userRoutes.post('/login', createLogin);
userRoutes.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);
userRoutes.get('/user', validateJWT, getUsers);

module.exports = userRoutes;