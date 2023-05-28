const createLogin = require('./Login.controller');
const { createUser, getUsers, getUserById } = require('./User.controller');
const { createCategory, getCategories } = require('./Category.controller');
const { getPosts, getPostById, updatePost } = require('./Posts.controller');

module.exports = {
    getUsers,
    getUserById,
    createLogin,
    createUser,
    createCategory,
    getCategories,
    getPosts,
    getPostById,
    updatePost,
};