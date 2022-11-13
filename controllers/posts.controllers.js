const Post = require('../models/post.model');
const createError = require('http-errors');



const posts = {
    list: (req, res, next) => {
        console.log('list');
        
        Post.find()

            .then(posts => res.json(posts))
            .catch(error => next(error));
    },
    create: (req, res, next) => {


        const post = new Post(req.body);
        post.save()

            .then(post => res.status(201).json(post))
            .catch(error => next(error));
    },
    get: (req, res, next) => {
        const id = req.params.id;
        Post.findById(id)

            .then(post => {
                if (!post) {
                    next(createError(404, 'Post not found.'));
                } else {
                    res.json(post);
                }
            })
            .catch(error => next(error));
    },
    update: (req, res, next) => {
        const id = req.params.id;
        Post.findByIdAndUpdate(id, req.body
            , { new: true, runValidators: true })
            .then(post => {
                if (!post) {
                    next(createError(404, 'Post not found.'));
                } else {
                    res.status(202).json(post);
                }
            })
            .catch(error => next(error));
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        Post.findByIdAndDelete(id)

            .then(post => {
                if (!post) {
                    next(createError(404, 'Post not found.'));
                } else {
                    res.status(204).send();
                }
            })
            .catch(error => next(error));
    }
};


module.exports = posts;


