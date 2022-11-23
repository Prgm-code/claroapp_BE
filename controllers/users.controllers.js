const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const transporter = require('../config/mail.config.js');
const dotenv = require('dotenv');
dotenv.config();




const users = {
    validate: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newUser = await User.findById(id);

            if (!newUser) return next(createError(404, 'user not found'));
            if (newUser.active) return next(createError(400, 'user already validated'));

            const user = await User
                .findByIdAndUpdate(
                    id,
                    { active: true },
                    { new: true }
                );

            console.log(user)

            res.send('<h1>Account validated</h1>');
            //redirect to login
            // res.redirect('http://localhost:3000/login');
        } catch (error) {
            console.log(error);
            next(createError(400, 'bad request'));

        }
    },


    signup: (req, res, next) => {
        const user = new User({ ...req.body, active: false });

        user.save()
            .then(user => {

                res.status(201).json(user)
                transporter.sendMail({
                    from: 'System Validation <system.noreply@prgm.info>',
                    to: req.body.email,
                    subject: 'User Validation',
                    text: `Click on the link to validate your account ${process.env.URL}/api/users/${user._id}/validate`,
                    html: `
                    <h1>Click on the link to validate your account</h1>
                    <a href="${process.env.URL}/api/users/${user._id}/validate">Validate</a>
                    
        
                    `
                })
                    .then(info => console.log(info))
                    .catch(error => console.log(error));

            })
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
                                    process.env.JWT_SECRET);
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
            })
            .catch(next);
    }


};

exports.users = users;