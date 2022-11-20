
const { Schema, model } = require('mongoose');
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        required: "name is required",

    },
    email: {
        type: String,
        required: "email is required",
        unique: true,
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, "email is invalid"]
    },


    password: {
    type: String,
    required: "password is required",
    minlength: 8,
    trim: true,
    match: [PASSWORD_PATTERN, "password is invalid"]
    },

    bio: {
    type: String,
},
    active: {
    type: Boolean,
    default: false,
},

}, {
    timestamps: true,
        toJSON: {
        virtuals: true,
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
    },
    toObject: {

        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }


});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    } else {
        next();

    }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};



module.exports = model('User', userSchema);