const validatePassword = require('../src/middlewares/validatePassword');

describe('validatePassword middleware', () => {
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

  it('should call next() when password has 6 characters', () => {
    req.body.password = '123456';
    
    validatePassword(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next() when password has more than 6 characters', () => {
    req.body.password = '1234567890';
    
    validatePassword(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 400 when password has less than 6 characters', () => {
    req.body.password = '12345';
    
    validatePassword(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"password" length must be at least 6 characters long'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when password is empty', () => {
    req.body.password = '';
    
    validatePassword(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"password" length must be at least 6 characters long'
    });
    expect(next).not.toHaveBeenCalled();
  });
});