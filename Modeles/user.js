const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = new mongoose.Schema(
  {
    username: {type : String, required: [true, 'Can\'t be empty']},
    usermail: {type : String, required: [true, 'Can\'t be empty']},
    userpassword: {type : String, required: [true, 'Can\'t be empty']},
    userpicture: {type : String},

  },
  {
    collection: 'Admin-data', minimize : false
  }
)

User.plugin(uniqueValidator)

module.exports = mongoose.model('Admin-data', User)