const createLogin = require('./Login.controller');
const { createUser, getUsers, getUserById } = require('./User.controller');

module.exports = {
    getUsers,
    getUserById,
    createLogin,
    createUser,
};