const { Op } = require('sequelize');
const {
  BlogPost,
  User,
  Category,
  sequelize,
  PostCategory,
} = require('../models');

const getPosts = async () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

const getPostById = async (id) =>
  BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

const updatePost = async (id, { title, content }) => {
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } }
  );

  const updated = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updated;
};

const deletePost = async (id) => BlogPost.destroy({ where: { id } });

const searchPost = async (q) => {
  const search = `%${q}%`;

  const post = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: search },
        content: { [Op.like]: search },
      },
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', througt: { attributes: [] } },
    ],
  });
  return post;
};

const validateCategoryIds = async (categoryIds) => {
  const arrCategoryIds = categoryIds.map((id) => Category.findByPk(id));

  return Promise.all(arrCategoryIds);
};

const createPost = async ({
  title,
  content,
  userId,
  categoryIds,
  published,
  updated,
}) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create(
      { title, content, userId, published, updated },
      { transaction: t }
    );

    console.log(categoryIds);

    const promise = categoryIds.map((categoryId) =>
      PostCategory.create({ categoryId, postId: post.id }, { transaction: t })
    );

    await Promise.all(promise);

    return post;
  });

  return result;
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
  createPost,
  validateCategoryIds,
};
