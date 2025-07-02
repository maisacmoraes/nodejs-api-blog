const postsController = require('../src/controllers/Posts.controller');

// Mock the posts service
jest.mock('../src/services', () => ({
  postsService: {
    getPosts: jest.fn(),
    getPostById: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    searchPost: jest.fn(),
    createPost: jest.fn(),
    validateCategoryIds: jest.fn(),
  },
}));

const { postsService } = require('../src/services');

describe('Posts Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      payload: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return all posts with 200 status', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ];
      postsService.getPosts.mockResolvedValue(mockPosts);

      await postsController.getPosts(req, res);

      expect(postsService.getPosts).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should return 500 on service error', async () => {
      const error = new Error('Database error');
      postsService.getPosts.mockRejectedValue(error);

      await postsController.getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('getPostById', () => {
    it('should return post with 200 status when post exists', async () => {
      const mockPost = { id: 1, title: 'Post 1' };
      req.params.id = '1';
      postsService.getPostById.mockResolvedValue(mockPost);

      await postsController.getPostById(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('should return 404 when post does not exist', async () => {
      req.params.id = '999';
      postsService.getPostById.mockResolvedValue(null);

      await postsController.getPostById(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('999');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post does not exist' });
    });

    it('should return 500 on service error', async () => {
      req.params.id = '1';
      const error = new Error('Database error');
      postsService.getPostById.mockRejectedValue(error);

      await postsController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('searchPost', () => {
    it('should return search results with 200 status', async () => {
      const mockResults = [{ id: 1, title: 'Search Result' }];
      req.query.q = 'search term';
      postsService.searchPost.mockResolvedValue(mockResults);

      await postsController.searchPost(req, res);

      expect(postsService.searchPost).toHaveBeenCalledWith('search term');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('should return 500 on service error', async () => {
      req.query.q = 'search term';
      const error = new Error('Search error');
      postsService.searchPost.mockRejectedValue(error);

      await postsController.searchPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Search error' });
    });
  });

  describe('createPost', () => {
    beforeEach(() => {
      req.body = {
        title: 'New Post',
        content: 'New Content',
        categoryIds: [1, 2],
      };
      req.payload = {
        data: { id: 1 },
      };
    });

    it('should create post with 201 status when all fields are provided', async () => {
      const mockPost = { id: 1, title: 'New Post', content: 'New Content' };
      postsService.validateCategoryIds.mockResolvedValue([{}, {}]); // valid categories
      postsService.createPost.mockResolvedValue(mockPost);

      await postsController.createPost(req, res);

      expect(postsService.validateCategoryIds).toHaveBeenCalledWith([1, 2]);
      expect(postsService.createPost).toHaveBeenCalledWith({
        title: 'New Post',
        content: 'New Content',
        userId: 1,
        categoryIds: [1, 2],
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('should return 400 when title is missing', async () => {
      delete req.body.title;

      await postsController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Some required fields are missing',
      });
      expect(postsService.createPost).not.toHaveBeenCalled();
    });

    it('should return 400 when content is missing', async () => {
      delete req.body.content;

      await postsController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Some required fields are missing',
      });
      expect(postsService.createPost).not.toHaveBeenCalled();
    });

    it('should return 400 when categoryIds is missing', async () => {
      delete req.body.categoryIds;

      await postsController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Some required fields are missing',
      });
      expect(postsService.createPost).not.toHaveBeenCalled();
    });

    it('should return 400 when category IDs are invalid', async () => {
      postsService.validateCategoryIds.mockResolvedValue([{}, null]); // one invalid category

      await postsController.createPost(req, res);

      expect(postsService.validateCategoryIds).toHaveBeenCalledWith([1, 2]);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'one or more "categoryIds" not found',
      });
      expect(postsService.createPost).not.toHaveBeenCalled();
    });
  });

  describe('updatePost', () => {
    beforeEach(() => {
      req.params.id = '1';
      req.body = {
        title: 'Updated Title',
        content: 'Updated Content',
      };
      req.payload = {
        data: { id: 1 },
      };
    });

    it('should update post with 200 status when user owns the post', async () => {
      const mockPost = { id: 1, userId: 1 };
      const mockUpdatedPost = { id: 1, title: 'Updated Title', content: 'Updated Content' };
      postsService.getPostById.mockResolvedValue(mockPost);
      postsService.updatePost.mockResolvedValue(mockUpdatedPost);

      await postsController.updatePost(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(postsService.updatePost).toHaveBeenCalledWith('1', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedPost);
    });

    it('should return 401 when user does not own the post', async () => {
      const mockPost = { id: 1, userId: 2 }; // different user
      postsService.getPostById.mockResolvedValue(mockPost);

      await postsController.updatePost(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized user' });
      expect(postsService.updatePost).not.toHaveBeenCalled();
    });

    it('should return 400 when title is missing', async () => {
      delete req.body.title;

      await postsController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Some required fields are missing',
      });
      expect(postsService.updatePost).not.toHaveBeenCalled();
    });

    it('should return 400 when content is missing', async () => {
      delete req.body.content;

      await postsController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Some required fields are missing',
      });
      expect(postsService.updatePost).not.toHaveBeenCalled();
    });
  });

  describe('deletePost', () => {
    beforeEach(() => {
      req.params.id = '1';
      req.payload = {
        data: { id: 1 },
      };
    });

    it('should delete post with 204 status when user owns the post', async () => {
      const mockPost = { id: 1, userId: 1 };
      postsService.getPostById.mockResolvedValue(mockPost);
      postsService.deletePost.mockResolvedValue(1);

      await postsController.deletePost(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(postsService.deletePost).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith(1);
    });

    it('should return 404 when post does not exist', async () => {
      postsService.getPostById.mockResolvedValue(null);

      await postsController.deletePost(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post does not exist' });
      expect(postsService.deletePost).not.toHaveBeenCalled();
    });

    it('should return 401 when user does not own the post', async () => {
      const mockPost = { id: 1, userId: 2 }; // different user
      postsService.getPostById.mockResolvedValue(mockPost);

      await postsController.deletePost(req, res);

      expect(postsService.getPostById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized user' });
      expect(postsService.deletePost).not.toHaveBeenCalled();
    });
  });
});