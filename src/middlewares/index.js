const validateJWT = require('./validateJWT');
const validateDisplayName = require('./validateDisplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');

module.exports = {
    validateJWT,
    validateDisplayName,
    validateEmail,
    validatePassword,
};