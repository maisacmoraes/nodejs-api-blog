const { postsService } = require('../services');

const getPosts = async (_req, res) => {
    try {
      const posts = await postsService.getPosts();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const getPostById = async (req, res) => {
    try {
    const { id } = req.params;

    const post = await postsService.getPostById(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getPosts, getPostById };