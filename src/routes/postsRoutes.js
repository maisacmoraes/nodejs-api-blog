const express = require('express');

const postsRoutes = express.Router();

// const validateJwt = require('../middlewares/validateJWT');
const { createLogin } = require('../controllers');

postsRoutes.post('/login', createLogin);

module.exports = postsRoutes;