const createLogin = require('./Login.controller');
const { createUser, getUsers, getUserById } = require('./User.controller');
const { createCategory } = require('./Category.controller');

module.exports = {
    getUsers,
    getUserById,
    createLogin,
    createUser,
    createCategory,
};