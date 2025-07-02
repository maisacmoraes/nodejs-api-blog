const validateDisplayName = require('../src/middlewares/validateDisplayName');

describe('validateDisplayName middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res)
    };
    next = jest.fn();
  });

  it('should call next() when displayName has 8 characters', () => {
    req.body.displayName = '12345678';
    
    validateDisplayName(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next() when displayName has more than 8 characters', () => {
    req.body.displayName = 'John Doe Smith';
    
    validateDisplayName(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 400 when displayName has less than 8 characters', () => {
    req.body.displayName = '1234567';
    
    validateDisplayName(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"displayName" length must be at least 8 characters long'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when displayName is empty', () => {
    req.body.displayName = '';
    
    validateDisplayName(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"displayName" length must be at least 8 characters long'
    });
    expect(next).not.toHaveBeenCalled();
  });
});