

const User = require( '../models/user.model.js');
const createError = require( 'http-errors');

const { verify } = require( 'jsonwebtoken');


 const verifyToken = async (req, res, next) => {
    try {
        if(!req.headers.authorization) return next(createError(401,'unauthorized request'));
        const token = req.headers.authorization.split(' ')[1];
        
        const decoded = verify(token, 'process.env.JWT_SECRET');
        
        req.userId =  decoded.sub;
        const user = await User.findById(req.userId);
        console.log(user);
        if (!user) return next(createError(401));
        next();
    } catch (error) {
        console.log(error);

        next(createError(error));
    }
};

module.exports = { verifyToken };