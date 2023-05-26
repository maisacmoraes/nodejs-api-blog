const { categoryService } = require('../services');

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
    createCategory,
};