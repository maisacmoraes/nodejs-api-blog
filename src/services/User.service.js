const { User } = require('../models');

const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getByUserMail = async (email) => User.findOne({ where: { email } });

const createUser = async (objUser) => 
  User.create(objUser);

module.exports = {
  getByUserMail,
  createUser,
  getUsers,
};