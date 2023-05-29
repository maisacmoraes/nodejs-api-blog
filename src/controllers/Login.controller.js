const { createToken } = require('../auth/authfunctions');

const { userService } = require('../services');

const isBodyValid = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
      }

    const user = await userService.getByUserMail(email);

    if (!user || !password === user.password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    console.log(userWithoutPassword);

    const token = createToken(userWithoutPassword);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};
