const validateJWT = require('../src/middlewares/validateJWT');
const { verifyToken } = require('../src/auth/authfunctions');

jest.mock('../src/auth/authfunctions');

describe('validateJWT middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      payload: undefined
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res)
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should call next() when valid token is provided', async () => {
    const mockData = { data: { id: 1, email: 'user@example.com' } };
    req.headers.authorization = 'validToken';
    verifyToken.mockReturnValue(mockData);
    
    await validateJWT(req, res, next);
    
    expect(verifyToken).toHaveBeenCalledWith('validToken');
    expect(req.payload).toEqual(mockData);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 401 when no authorization header is provided', async () => {
    await validateJWT(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token not found'
    });
    expect(next).not.toHaveBeenCalled();
    expect(verifyToken).not.toHaveBeenCalled();
  });

  it('should return 401 when token verification fails', async () => {
    req.headers.authorization = 'invalidToken';
    verifyToken.mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    await validateJWT(req, res, next);
    
    expect(verifyToken).toHaveBeenCalledWith('invalidToken');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Expired or invalid token'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when token is expired', async () => {
    req.headers.authorization = 'expiredToken';
    verifyToken.mockImplementation(() => {
      const error = new Error('jwt expired');
      error.name = 'TokenExpiredError';
      throw error;
    });
    
    await validateJWT(req, res, next);
    
    expect(verifyToken).toHaveBeenCalledWith('expiredToken');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Expired or invalid token'
    });
    expect(next).not.toHaveBeenCalled();
  });
});