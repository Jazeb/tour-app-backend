require('dotenv');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();

const resp = require('../resp');
const User = require('../schema/user');

const JWT_SECRET = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

const company = require('../controller/company.controller');


router.post('/addTour', company.addTour);
router.post('/create', company.createCompany);

module.exports = router;