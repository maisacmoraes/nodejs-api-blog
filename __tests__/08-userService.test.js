const userService = require('../src/services/User.service');

// Mock the User model
jest.mock('../src/models', () => ({
  User: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  },
}));

const { User } = require('../src/models');

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return all users excluding password', async () => {
      const mockUsers = [
        { id: 1, displayName: 'John Doe', email: 'john@example.com' },
        { id: 2, displayName: 'Jane Smith', email: 'jane@example.com' },
      ];
      User.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getUsers();

      expect(User.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ['password'] },
      });
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should return user by id excluding password', async () => {
      const mockUser = { id: 1, displayName: 'John Doe', email: 'john@example.com' };
      User.findByPk.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: { exclude: ['password'] },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getByUserMail', () => {
    it('should return user by email', async () => {
      const mockUser = {
        id: 1,
        displayName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
      };
      User.findOne.mockResolvedValue(mockUser);

      const result = await userService.getByUserMail('john@example.com');

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      User.findOne.mockResolvedValue(null);

      const result = await userService.getByUserMail('nonexistent@example.com');

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        displayName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        image: 'http://example.com/image.jpg',
      };
      const mockCreatedUser = { id: 1, ...userData };
      User.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(userData);

      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      User.destroy.mockResolvedValue(1);

      const result = await userService.deleteUser(1);

      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBe(1);
    });

    it('should return 0 if user does not exist', async () => {
      User.destroy.mockResolvedValue(0);

      const result = await userService.deleteUser(999);

      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(result).toBe(0);
    });
  });
});