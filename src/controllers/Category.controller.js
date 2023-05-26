const { categoryService } = require('../services');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const createCategory = async (req, res) => {
    try {
    const category = req.body;
    const { name } = category;

    if (!name) { return res.status(400).json({ message: '"name" is required' }); }
    
    const createdCategory = await categoryService.createCategory(category);

    return res.status(201).json(createdCategory);
    } catch (err) {
        return res.status(500).json({ message: 'Erro interno', error: err.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
};