const express = require('express');

const routes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin, createUser, getUsers, getUserById, createCategory, getCategories,
    getPosts, getPostById, updatePost, deleteUser,
    searchPost, deletePost, createPost } = require('../controllers');
const { validateJWT, validateDisplayName,
    validateEmail, validatePassword } = require('../middlewares');

routes.post('/login', createLogin);

routes.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);
routes.get('/user', validateJWT, getUsers);
routes.get('/user/:id', validateJWT, getUserById);
routes.delete('/user/:id', validateJWT, deleteUser);

routes.post('/categories', validateJWT, createCategory);
routes.get('/categories', validateJWT, getCategories);

routes.post('/post', validateJWT, createPost);
routes.get('/post', validateJWT, getPosts);
routes.get('/post/search', validateJWT, searchPost);
routes.get('/post/:id', validateJWT, getPostById);
routes.put('/post/:id', validateJWT, updatePost);
routes.delete('/post/:id', validateJWT, deletePost);

module.exports = routes;