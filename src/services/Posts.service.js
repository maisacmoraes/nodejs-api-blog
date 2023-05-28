const { BlogPost, User, Category } = require('../models');

const getPosts = async () => BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
});

const getPostById = async (id) => BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
});

const updatePost = async ({ title, content, id }) => {
    await BlogPost.update(
        { title, content, update: new Date() },
        { where: { id } },
    );
};

module.exports = { getPosts, getPostById, updatePost };