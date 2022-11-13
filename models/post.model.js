
const { Schema , model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    text: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }

});

module.exports = model('Post', postSchema);
