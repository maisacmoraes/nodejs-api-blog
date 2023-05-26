const express = require('express');

const userRoutes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin, createUser, getUsers, getUserById } = require('../controllers');
const { validateJWT, validateDisplayName,
    validateEmail, validatePassword } = require('../middlewares');

userRoutes.post('/login', createLogin);
userRoutes.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);
userRoutes.get('/user', validateJWT, getUsers);
userRoutes.get('/user/:id', validateJWT, getUserById);

module.exports = userRoutes;