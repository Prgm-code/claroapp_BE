
const { Schema , model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        Validate: {
            validator: function (value) {
                return validator.isEmail(value); //revisar 
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
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
    }

});


module.exports = model('User', userSchema);