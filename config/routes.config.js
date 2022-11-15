const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controllers.js');
const { users } = require('../controllers/users.controllers.js');
const { verifyToken } = require('../middlewares/authJwt.js');


// Routes here
// Example:
// router.get('/posts', posts.list)

router.post('/posts',[ verifyToken, posts.create]);
router.get('/posts', posts.list);
router.get('/posts/:id', posts.get);
router.patch('/posts/:id',[ verifyToken, posts.update]);
router.delete('/posts/:id',[ verifyToken, posts.delete]);



router.post('/users/signup', users.signup);
router.post('/users/login', users.login);




module.exports = router;
