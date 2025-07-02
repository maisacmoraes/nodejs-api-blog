const validateEmail = require('../src/middlewares/validateEmail');

describe('validateEmail middleware', () => {
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

  it('should call next() when email is valid', () => {
    req.body.email = 'user@example.com';
    
    validateEmail(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next() when email has subdomain', () => {
    req.body.email = 'user@mail.example.com';
    
    validateEmail(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 400 when email is invalid - missing @', () => {
    req.body.email = 'userexample.com';
    
    validateEmail(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"email" must be a valid email'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when email is invalid - missing domain', () => {
    req.body.email = 'user@';
    
    validateEmail(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"email" must be a valid email'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when email is invalid - invalid format', () => {
    req.body.email = 'user@.com';
    
    validateEmail(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: '"email" must be a valid email'
    });
    expect(next).not.toHaveBeenCalled();
  });
});