const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controllers.js');


// Routes here
// Example:
// router.get('/posts', posts.list)

router.post('/', posts.create);
router.get('/', posts.list);
router.get('/:id', posts.get);
router.patch('/:id', posts.update);
router.delete('/:id', posts.delete);




module.exports = router;
