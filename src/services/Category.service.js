const { Category } = require('../models');

const getCategories = async () => Category.findAll();

const createCategory = async (category) => Category.create(category);

module.exports = {
  getCategories,
  createCategory,
};