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

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const { data } = req.payload;
    
        if (!title || !content) { 
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
    
        const post = await postsService.getPostById(id);
        if (data.id !== post.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
    
        await postsService.updatePost({ id, title, content });
    
        const updatedPost = await postsService.getPostById(id);
    
        return res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchPost = async (req, res) => {
    try {
        const { q } = req.query;
      
        const post = await postsService.searchPost(q);
      
        return res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };
  
module.exports = { getPosts, getPostById, updatePost, searchPost };