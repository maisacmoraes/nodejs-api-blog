const { Op } = require('sequelize');
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

const searchPost = async (q) => {
    const search = `%${q}%`;

    const post = await BlogPost.findAll(
        { where: { [Op.or]: { 
          title: { [Op.like]: search }, 
          content: { [Op.like]: search },
        } },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', througt: { attributes: [] } },
        ] }, 
      );
      return post;
};

module.exports = { getPosts, getPostById, updatePost, searchPost };