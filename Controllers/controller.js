const User = require('../Modeles/user');
const Post = require('../Modeles/posts');
const Category = require('../Modeles/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Middleware for registration of the Admin*/

const signup = async(req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.userpassword, 10)
  const user = new User({
    username : req.body.username,
    usermail : req.body.usermail,
    userpassword : hashedPassword,
  })
  user.save()
      .then((data)=> {
        res.status(201).json({message: 'Admin registration successful !', data})
      })
      .catch((err)=> {
        res.status(400).json({message: 'Password or email not valid'})
      });
}

/** Middleware of logging in */

const login = (req, res) => {
  User.findOne({usermail: req.body.usermail})
  .then(user => {
    if(!user){
      return res.status(401).json({message: 'Email or password incorrect'})
    }
    bcrypt.compare(req.body.userpassword, user.userpassword)
          .then(valid => {
            if(!valid){
              return res.status(401).json({message: 'Email or password incorrect'})
            }
            res.status(200).json({
              userId : user._id,
              username : user.username,
              usermail : user.usermail,
              token : jwt.sign(
                {userid: user._id},
                'GENERATED TOKEN FOR 7-EMPIRE IN GOMA DRC',
                {expiresIn: '24h'}
                )
            })
          })
          .catch((err) => {
            res.status(500).json({message: 'Server error: ' + err.message})
          })
  })
}

/** Adding posts to the database*/

const addPost = async(req, res) => {
  try {
    const { title, featuredPicture, attack, body, categories, tags } = req.body;
    const data = await Post.create(
      { 
        title: title, 
        featuredPicture: featuredPicture,
        attack : attack, 
        body: body, 
        categories : categories, 
        tags: tags 
      }
    );
    if(data){
      return res.status(200).json({message : 'post successfully added', data: data});
    }
    return res.status(400).json({message : 'Fail add post, please try again or come back a bit later'})
    
  } catch (error) {
    res.status(500).json({message: 'An error occurred, we try to do our best to recover soon', error})
  }
}

/** Middleware of adding categories **/

const addCategories = async(req, res) => {
  try {
    const {category} = req.body
    const data = await Category.create(
      {
        categories : {category: category}
      }
    )
    if(data){
      return res.status(200).json({message: 'Category created successfully', data: data.categories})
    }
    return res.status(400).json({message: 'Fail to add a category, please try again or come back a bit later'})
  } catch (error) {
    res.status(500).json({message: 'An error occurred, we try to do our best to recover soon'})
  }
};

/** Getting middleware posts **/

const getPosts = async(req, res) => {

    Post.find()
        .then((post)=> {
          res.status(200).json({post: post});
        })
        .catch((error)=> {
          res.status(404).json({message: 'Fail to get posts from server', error: error});
        });
};

module.exports = {
  signup,
  login,
  addPost,
  addCategories,
  getPosts
}