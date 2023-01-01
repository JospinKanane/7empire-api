const mongoose = require('mongoose');

const Category = new mongoose.Schema(
  {
    categories : { 
      category : {
        type : String,
        required : [true, 'Can\'t be empty']
      },
    }
  },
  {
    collation : 'posts-categories', minimize : false,
  }
)

module.exports = mongoose.model('posts-categories', Category)

