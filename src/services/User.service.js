const { User } = require('../models');

const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (userId) => User.findByPk(userId, { attributes: { exclude: ['password'] } });

const getByUserMail = async (email) => User.findOne({ where: { email } });

const createUser = async (objUser) => User.create(objUser);

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  getUsers,
  getUserById,
  getByUserMail,
  createUser,
  deleteUser,
};