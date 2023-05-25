const { User } = require('../models');

const getByUserMail = (email) => User.findOne({ where: { email } });
// findOne(email)
module.exports = {
  getByUserMail,
};