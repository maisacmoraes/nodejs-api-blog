const { createToken, verifyToken } = require('../src/auth/authfunctions');

describe('auth functions', () => {
  const testData = { id: 1, email: 'user@example.com' };

  describe('createToken', () => {
    it('should create a valid JWT token', () => {
      const token = createToken(testData);
      
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should create different tokens for different data', () => {
      const token1 = createToken({ id: 1 });
      const token2 = createToken({ id: 2 });
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return the data', () => {
      const token = createToken(testData);
      
      const result = verifyToken(token);
      
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(testData);
      expect(result).toHaveProperty('iat'); // issued at
      expect(result).toHaveProperty('exp'); // expires at
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => {
        verifyToken(invalidToken);
      }).toThrow();
    });

    it('should throw error for malformed token', () => {
      const malformedToken = 'notajwttoken';
      
      expect(() => {
        verifyToken(malformedToken);
      }).toThrow();
    });

    it('should throw error for empty token', () => {
      expect(() => {
        verifyToken('');
      }).toThrow();
    });

    it('should throw error for null token', () => {
      expect(() => {
        verifyToken(null);
      }).toThrow();
    });
  });

  describe('token lifecycle', () => {
    it('should create and verify token successfully', () => {
      const originalData = { id: 123, email: 'test@example.com', role: 'user' };
      
      const token = createToken(originalData);
      const verifiedData = verifyToken(token);
      
      expect(verifiedData.data).toEqual(originalData);
    });
  });
});