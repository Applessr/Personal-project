const authController = {};
const createError = require('../utils/createError');
const authServices = require('../services/auth-service');
const hashServices = require('../services/hash-service');
const jwtServices = require('../services/jwt-services')


authController.register = async(req,res,next) => {
    try {
        const {username,email,password} = req.input;

        const user = await authServices.getEmail(email);

        if (user) {
            return createError(400, 'User is already exist')
        }

        const hashPassword = await hashServices.hash(password);

        const result = await authServices.createUser({username,email,password: hashPassword})

        console.log(result)
        res.json({username, email})
    } catch(err) {
        console.log('Error from register', err)
        next(err);
    }
};

authController.login = async(req, res, next) => {
    try {
        const {username,email,password} = req.body;
        let user;
        if (email) {
            user = await authServices.getEmail(email);
        } else if (username) {
            user = await authServices.getUsername(username);
        }

        if(!user) {
            return createError(400,'Username or Email does not exist')
        }

        const isMatch = await hashServices.compare( password, user.password );

        if (!isMatch) {
            return createError(400, 'Password incorrect')
        }
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        };

        const accessToken = jwtServices.sign({id: user.id})
        console.log(accessToken)
    
        res.json({ 
            user: payload,
            token: accessToken, 
        });
        
    } catch (err) {
        console.log('error from login',err)
        next(err)
    }
};

authController.forgetPassword = async(req, res, next) => {
    try {
        const {email} = req.body;

        const user = await authServices.getEmail(email)

        if(!user) {
            return createError(400,'Username or Email does not exist')
        }
        
        const resetToken = authServices.createResetPassword();
        const hashedToken = authServices.hashToken(resetToken);

     
        await authServices.saveResetToken(user.id, hashedToken);

        await authServices.sendResetEmail(user.email, resetToken);

        res.json({ message: 'Reset password email sent successfully' });
    }catch (err) {
        console.log('error from forgetPassword',err)
        next(err);
    }
};

authController.resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
            

        const userId = await authServices.verifyResetToken(token);
        
        if (!userId) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // อัปเดตรหัสผ่านใหม่
        await authServices.updatePassword(userId, newPassword);

        res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.log('error from resetPassword', err);
        next(err);
    }
};

module.exports = authController;
