const { BlogPost, User, Category } = require('../models');

const getPosts = async () => BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ] });

const getPostById = async (id) => BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
] });

module.exports = { getPosts, getPostById };