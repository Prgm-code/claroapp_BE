const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controllers.js');


// Routes here
// Example:
// router.get('/posts', posts.list)

router.post('/posts', posts.create);
router.get('/posts', posts.list);
router.get('/posts/:id', posts.get);
router.patch('/posts/:id', posts.update);
router.delete('/posts/:id', posts.delete);




module.exports = router;
