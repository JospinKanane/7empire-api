const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller')

/* GET home page. */
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/addpost', controller.addPost);
router.post('/addcategory', controller.addCategories);
router.get('/posts', controller.getPosts);

module.exports = router;
