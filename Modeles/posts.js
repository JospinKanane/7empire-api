const mongoose = require('mongoose');

const Post = new mongoose.Schema(
  {
    title : {type : String, require: [true, 'Can\'t be empty']},
    featuredPicture : {type : String},
    attack : {type : String, require: [true, 'Can\'t be empty']},
    body : {type : String, require: [true, 'Can\'t be empty']},
    categories : {type : Array, default : 'Uncategorized'},
    tags : {type : Array},
  },
  {
    collection : 'Posts-data', minimize : false, timestamps : true
  }
);

module.exports = mongoose.model('Posts-data', Post)
