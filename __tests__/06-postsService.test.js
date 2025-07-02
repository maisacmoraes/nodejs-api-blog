const postsService = require('../src/services/Posts.service');

// Mock the models
jest.mock('../src/models', () => ({
  BlogPost: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    create: jest.fn(),
  },
  User: {},
  Category: {
    findByPk: jest.fn(),
  },
  PostCategory: {
    create: jest.fn(),
  },
  sequelize: {
    transaction: jest.fn(),
  },
  Op: {
    or: Symbol('or'),
    like: Symbol('like'),
  },
}));

const { BlogPost, Category, PostCategory, sequelize } = require('../src/models');

describe('Posts Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return all posts with user and categories', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ];
      BlogPost.findAll.mockResolvedValue(mockPosts);

      const result = await postsService.getPosts();

      expect(BlogPost.findAll).toHaveBeenCalledWith({
        include: [
          { model: {}, as: 'user', attributes: { exclude: 'password' } },
          { model: { findByPk: expect.any(Function) }, as: 'categories', through: { attributes: [] } },
        ],
      });
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should return a post by id with user and categories', async () => {
      const mockPost = { id: 1, title: 'Post 1', content: 'Content 1' };
      BlogPost.findOne.mockResolvedValue(mockPost);

      const result = await postsService.getPostById(1);

      expect(BlogPost.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        include: [
          { model: {}, as: 'user', attributes: { exclude: 'password' } },
          { model: { findByPk: expect.any(Function) }, as: 'categories', through: { attributes: [] } },
        ],
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post by id', async () => {
      BlogPost.destroy.mockResolvedValue(1);

      const result = await postsService.deletePost(1);

      expect(BlogPost.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBe(1);
    });
  });

  describe('validateCategoryIds', () => {
    it('should validate that all category IDs exist', async () => {
      const mockCategory1 = { id: 1, name: 'Tech' };
      const mockCategory2 = { id: 2, name: 'Science' };
      Category.findByPk
        .mockResolvedValueOnce(mockCategory1)
        .mockResolvedValueOnce(mockCategory2);

      const result = await postsService.validateCategoryIds([1, 2]);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(Category.findByPk).toHaveBeenCalledWith(2);
      expect(result).toEqual([mockCategory1, mockCategory2]);
    });

    it('should return array with null for non-existent category IDs', async () => {
      Category.findByPk
        .mockResolvedValueOnce({ id: 1, name: 'Tech' })
        .mockResolvedValueOnce(null);

      const result = await postsService.validateCategoryIds([1, 999]);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(Category.findByPk).toHaveBeenCalledWith(999);
      expect(result[0]).toEqual({ id: 1, name: 'Tech' });
      expect(result[1]).toBeNull();
    });
  });

  describe('createPost', () => {
    it('should create a post with categories in a transaction', async () => {
      const mockTransaction = {
        commit: jest.fn(),
        rollback: jest.fn(),
      };
      const mockPost = { id: 1, title: 'New Post', content: 'New Content' };
      
      sequelize.transaction.mockImplementation(async (callback) => {
        return await callback(mockTransaction);
      });
      BlogPost.create.mockResolvedValue(mockPost);
      PostCategory.create.mockResolvedValue({});

      const postData = {
        title: 'New Post',
        content: 'New Content',
        userId: 1,
        categoryIds: [1, 2],
      };

      const result = await postsService.createPost(postData);

      expect(sequelize.transaction).toHaveBeenCalled();
      expect(BlogPost.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Post',
          content: 'New Content',
          userId: 1,
        }),
        { transaction: mockTransaction }
      );
      expect(PostCategory.create).toHaveBeenCalledTimes(2);
      expect(PostCategory.create).toHaveBeenCalledWith(
        { categoryId: 1, postId: 1 },
        { transaction: mockTransaction }
      );
      expect(PostCategory.create).toHaveBeenCalledWith(
        { categoryId: 2, postId: 1 },
        { transaction: mockTransaction }
      );
      expect(result).toEqual(mockPost);
    });
  });
});