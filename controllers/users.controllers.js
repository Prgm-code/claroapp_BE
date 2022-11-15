const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');



const users = {
    signup: (req, res, next) => {
        const user = new User(req.body);
        user.save()
            .then(user => res.status(201).json(user))
            .catch(error => next(createError(error)));
    },
    login: (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user) {
                    user.checkPassword(password)
                        .then(match => {
                            if (match) {
                                const token = jwt.sign(
                                    { sub: user._id, exp: Date.now() / 1000 * 3600 },
                                    'process.env.JWT_SECRET'

                                );
                                console.log(token);

                                res.status(200).json(token);

                            } else {
                                next(createError(401));
                            }
                        })
                        .catch(error => next(error));
                } else {
                    next(createError(400));
                }
            }
            )
            .catch(next);
    }


};

exports.users = users;