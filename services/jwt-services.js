const jwt = require('jsonwebtoken');
const createError = require("../utils/createError");
const jwtServices = {};

jwtServices.sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '7d'});
};

jwtServices.verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = jwtServices;