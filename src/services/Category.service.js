const { Category } = require('../models');

const createCategory = async (category) => Category.create(category);

module.exports = {
  createCategory,
};