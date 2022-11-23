const dotenv = require('dotenv');
dotenv.config();


const User = require('../models/user.model.js');
const createError = require('http-errors');

const { verify } = require('jsonwebtoken');


const isAdmin = async (req, res, next) => {
    if (req.user.admin) {
        next();
    } else {
        next(createError(403, "forbidden: user is not admin"));
    }
};


const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return next(createError(401, 'unauthorized request'));
        const token = req.headers.authorization.split(' ')[1];

        const decoded = verify(token, process.env.JWT_SECRET);

        req.userId = decoded.sub;
        const user = await User.findOne({_id:req.userId, active: true});
        console.log(user);
        req.user = user;
        if (!user) return next(createError(401));
        next();
    } catch (error) {
        console.log(error);

        next(createError(error));
    }
};

module.exports = { verifyToken, isAdmin };