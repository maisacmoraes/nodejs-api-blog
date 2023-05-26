const express = require('express');

const userRoutes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin, createUser, getUsers,
    getUserById, createCategory, getCategories, getPosts } = require('../controllers');
const { validateJWT, validateDisplayName,
    validateEmail, validatePassword } = require('../middlewares');

userRoutes.post('/login', createLogin);
userRoutes.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);
userRoutes.get('/user', validateJWT, getUsers);
userRoutes.get('/user/:id', validateJWT, getUserById);
userRoutes.post('/categories', validateJWT, createCategory);
userRoutes.get('/categories', validateJWT, getCategories);
userRoutes.get('/post', validateJWT, getPosts);

module.exports = userRoutes;