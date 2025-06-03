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
    const { data } = req.payload;

    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing' });
    }

    const post = await postsService.getPostById(id);
    if (data.id !== post.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const updatedPost = await postsService.updatePost(id, req.body);
    return res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.payload;

    const post = await postsService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    if (data.id !== post.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const deletedPost = await postsService.deletePost(id);
    return res.status(204).json(deletedPost);
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

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { data } = req.payload;

  console.log(data.id);

  if (!title || !content || !categoryIds) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  const validateId = (await postsService.validateCategoryIds(categoryIds)).some(
    (id) => !id
  );

  if (validateId) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
  }

  const post = await postsService.createPost({
    title,
    content,
    userId: data.id,
    categoryIds,
    updated: new Date(),
    published: new Date(),
  });

  return res.status(201).json(post);
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  searchPost,
  deletePost,
  createPost,
};
