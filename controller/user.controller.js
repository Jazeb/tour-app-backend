const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

const resp = require('../resp');

const User = require('../schema/user');
const Companies = require("../schema/companies");

const hashPwd = password => bcrypt.hashSync(password, salt);
const generateToken = user => jwt.sign(JSON.stringify(user), JWT_SECRET);

const getTours = async (req, res) => {
    try {
        const tours = await Companies.find({}, { tours:1 });
        return resp.success(res, tours);
    } catch (error) {
        console.error(error);
        return resp.error(res, error);
    }
}

const signupHandler = (req, res) => {
    const data = req.body;
    if (data.password) data.password = hashPwd(data.password);

    const user = new User(data);
    user.save((err, data) => {
        if (err) return resp.success(res, null, err.message);
        delete user.password
        const token = generateToken(data);
        return resp.success(res, { user, token });
    });
}

const loginHandler = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return resp.error(res, 'Provide email and password');

    User.findOne({ email }).then(user => {
        if (!user) return resp.error(res, 'Invalid user');
        if (!bcrypt.compareSync(password, user.password)) return resp.error(res, 'Invalid password');

        const token = generateToken(user);
        return resp.success(res, { user, token });
    }).catch(err => resp.error(res, err));
}

module.exports = { signupHandler, loginHandler, getTours }