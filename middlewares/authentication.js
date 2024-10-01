const authServices = require("../services/auth-service");
const jwtServices = require("../services/jwt-services");
const createError = require("../utils/createError");

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return createError(401, 'Unauthorized');
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return createError(401, 'Unauthorized');
        }

        const jwtPayload = jwtServices.verify(token);
        
        const user = await authServices.findUserById(jwtPayload.id);
        
        if (!user) {
            return createError(401, 'Unauthorized');
        }

        delete user.password;
        req.user = user; 
        next(); 

    } catch (err) {
        console.log('error from authenticate', err);
        next(err);
    }
};

module.exports = authenticate;