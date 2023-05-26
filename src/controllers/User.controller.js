const { createToken } = require('../auth/authfunctions');
const { userService } = require('../services');

const getUsers = async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: 'Erro ao buscar usuários no banco',
        error: err.message,
      });
    }
  };

const createUser = async (req, res) => {
    try {
        const obj = req.body;

        const validateEmail = await userService.getByUserMail(obj.email);

        if (validateEmail !== null) {
            return res.status(409).json({ message: 'User already registered' });
        }

        const user = await userService.createUser(obj);
    
        const { password: _password, ...userWithoutPassword } = user.dataValues;

        const token = createToken(userWithoutPassword);
    
        return res.status(201).json({ token });
      } catch (error) {
        return res.status(500).json({ message: 'Erro interno', error: error.message });
      }
    };

module.exports = {
    getUsers,
    createUser,
};