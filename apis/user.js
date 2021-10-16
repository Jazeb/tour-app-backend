require('dotenv');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();

const resp = require('../resp');
const User = require('../schema/user');

const JWT_SECRET = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

const generateToken = user => jwt.sign(JSON.stringify(user), JWT_SECRET);

const hashPwd = password => bcrypt.hashSync(password, salt);

const ctrl = require('../controller/user.controller');


router.post('/signup', ctrl.signupHandler);

router.post('/login', ctrl.loginHandler);

router.get('/tours', ctrl.getTours);

// Password reset API
router.post('/resetPassword', async (req, res) => {
    try {
        const { email, new_password, confirm_password } = req.body;
        if (!email || !new_password || !confirm_password) return resp.error(res, 'Provide new and confirm password');

        if (new_password !== confirm_password) return resp.error(res, 'Password does not match');

        const password = hashPwd(new_password);
        User.findOneAndUpdate({ email }, { password }).then(rs => {
            return resp.success(res, 'Password is updated.');
        }).catch(err => resp.error(res, err));

    } catch (error) {
        console.error(error);
        return resp.error(res, 'Error sending email');
    }
});

module.exports = router;