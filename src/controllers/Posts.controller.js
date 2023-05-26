const { postsService } = require('../services');

const getPosts = async (_req, res) => {
    try {
      const posts = await postsService.getPosts();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({
        message: 'Erro ao buscar posts no banco',
        error: err.message,
      });
    }
  };

module.exports = { getPosts };