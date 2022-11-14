const User = require('../models/user.model.js');


const users = {
    signup: (req, res, next) => {
        const user = new User(req.body);
        user.save()
            .then(user => res.status(201).json(user))
            .catch(error => next(error));
    },
    login: (req, res, next) => {
        res.json({ message: 'Login' });
    }
};

