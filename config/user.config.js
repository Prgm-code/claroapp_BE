const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controllers.js');


// Routes here
// Example:
// router.get('/posts', posts.list)

router.post('/signup', users.signup);
router.post('/login', users.login);


module.exports = router;
