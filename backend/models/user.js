const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: 'test1',
    },

    apartment: {
        type: String,
        default: 'test1',
    },
    zip: {
        type: String,
        default: 'test1',
    },
    city: {
        type: String,
        default: 'test1',
    },
    country: {
        type: String,
        default: 'test1',
    },
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
