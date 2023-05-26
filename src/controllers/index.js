const createLogin = require('./Login.controller');
const { createUser, getUsers } = require('./User.controller');

module.exports = {
    createLogin,
    createUser,
    getUsers,
};