const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controllers.js');
const { users } = require('../controllers/users.controllers.js');
const  sites  = require('../controllers/sites.controllers.js');
const { verifyToken , isAdmin } = require('../middlewares/authJwt.js');


// Routes here
// Example:
// router.get('/posts', posts.list)

//CRUD
router.post('/posts',[ verifyToken, isAdmin, posts.create]);
router.get('/posts',[verifyToken , posts.list]);
router.get('/posts/:id',[verifyToken, posts.get]);
router.patch('/posts/:id',[ verifyToken, isAdmin, posts.update]);
router.delete('/posts/:id',[ verifyToken, isAdmin, posts.delete]);


//users
router.post('/users/signup', users.signup);
router.post('/users/login', users.login);
router.get('/users/:id/validate', users.validate);

//sites&keysList
router.get('/sites', sites.listSites);
router.get('/sites/:id', sites.findSite);
router.post('/sites', sites.createSite);
router.patch('/sites/:id', sites.updateSite);
router.delete('/sites/:id', sites.deleteSite);





module.exports = router;
