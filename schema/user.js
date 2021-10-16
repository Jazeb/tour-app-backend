const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const User = Schema({
    full_name:{
        type: String,
        required: false
    },
    user_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: false
    },
    is_verified: {
        type: Boolean,
        required: false,
        default: false
    },
    is_social_login: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
}, { collection: 'users' }, { __v: false });

module.exports = mongoose.model('users', User);