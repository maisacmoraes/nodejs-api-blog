const createLogin = require('./Login.controller');
const { createUser, getUsers, getUserById, deleteUser } = require('./User.controller');
const { createCategory, getCategories } = require('./Category.controller');
const { getPosts, getPostById, updatePost, searchPost, deletePost } = require('./Posts.controller');

module.exports = {
    createLogin,
    getUsers,
    getUserById,
    createUser,
    createCategory,
    getCategories,
    getPosts,
    getPostById,
    updatePost,
    deleteUser,
    searchPost,
    deletePost,
};