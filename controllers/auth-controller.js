const authController = {};
const createError = require('../utils/createError');
const authServices = require('../services/auth-service');
const hashServices = require('../services/hash-service');
const jwtServices = require('../services/jwt-services');
const prisma = require('../config/prisma');
const { sendResetEmail } = require('../services/mailer');


authController.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.input;

        const user = await authServices.getEmail(email);

        if (user) {
            return createError(400, 'User is already exist')
        }

        const hashPassword = await hashServices.hash(password);

        const result = await authServices.createUser({ username, email, password: hashPassword })

        console.log(result)
        res.json({ username, email })
    } catch (err) {
        console.log('Error from register', err)
        next(err);
    }
};

authController.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        let usernameOrEmailKey = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(identifier)) {
            usernameOrEmailKey = 'email';
        } else {
            usernameOrEmailKey = 'username';
        }

        const user = await prisma.user.findUnique({
            where: {
                [usernameOrEmailKey]: identifier,
            },
        });

        if (!user) {
            return next(createError(400, 'User not found'));
        }

        const isMatch = await hashServices.compare(password, user.password);

        if (!isMatch) {
            return next(createError(400, 'Password incorrect'));
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        };

        const accessToken = jwtServices.sign({ id: user.id });

        res.json({
            message: 'Login successful',
            user: payload,
            token: accessToken,
        });

    } catch (err) {
        console.log('Error from login:', err);
        next(err);
    }
};

authController.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await authServices.getEmail(email)

        if (!email) {
            return createError(400, 'Email is require')
        }
        if (!user) {
            return createError(400, 'Email does not exist')
        }

        const token = jwtServices.signResetToken({ userId: user.id });
        const expiryDate = new Date(Date.now() + 3600000); // 1 ชั่วโมง

        await authServices.updateResetPassword(email,token, expiryDate)

        await sendResetEmail(email, token, user.username);
        res.json({ message: 'Password reset email sent.',token });
    } catch (err) {
        console.log('error from forgetPassword', err)
        next(err);
    }
};

authController.resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
    try {
        if(!token) {
            return createError(400,'token is require')
        }
        if(!newPassword) {
            return createError(400,'newPassword is require')
        }
        const decoded = jwtServices.verify(token);
        console.log('Decoded token:', decoded); 

        const user = await authServices.findUserById(decoded.userId)
        console.log('User found:', user);

        if (!user || user.resetPasswordToken !== token || new Date() > user.resetPasswordExpires) {
            return createError(400,'Invalid or expired token')
        }

        const hashedPassword = await hashServices.hash(newPassword);
        await authServices.updatePassword(user.id, hashedPassword);

        res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.log('error from resetPassword', err);
        next(err);
    }
};
authController.currentUser = async (req, res, next) => {
    try {
        const email = req.user.email;
        const member = await authServices.getCurrentUser(email);

        if (!member) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(member);
        res.json({ member });
    } catch (err) {
        next(err);
    }
};

module.exports = authController;
