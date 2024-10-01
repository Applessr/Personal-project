const authServices = require("../services/auth-service");
const hashServices = require("../services/hash-service");
const userServices = require("../services/user-service");
const createError = require("../utils/createError");

const userController = {};

userController.getUserInfo = async(req,res,next) => {
    try {

        const userId = req.user.id;

        const userInfo = await authServices.findUserById(userId);

        if (!userInfo) {
            return createError(404,'User not found') 
        }

        delete userInfo.password; 
        res.json(userInfo);

    }catch (err) {
        console.log('Error from getUserInfo', err)
        next(err)
    }
}
userController.updateUserInfo = async (req, res, next) => {
    try {
        const { userId, username, email, currentPassword, newPassword, confirmPassword } = req.body;

        if (!userId) {
            return next(createError(400, 'User ID should be provided'));
        }

        if (typeof userId !== 'number' || isNaN(userId)) {
            return next(createError(400, 'User ID must be a valid number'));
        }

        const user = await authServices.findUserById(userId);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        const updatedData = {};
        if (username) {
            updatedData.username = username;
        }

        if (email) {
            updatedData.email = email;
        }

        if (currentPassword && newPassword && confirmPassword) {
            const isMatch = await hashServices.compare(currentPassword, user.password);
            if (!isMatch) {
                return next(createError(400, 'Current password is incorrect'));
            }

            if (newPassword !== confirmPassword) {
                return next(createError(400, 'New password and confirm password do not match'));
            }

            updatedData.password = await hashServices.hash(newPassword);
        }

        const updatedUser = await userServices.updateUser(userId, updatedData);

        res.json({ user: updatedUser });
    } catch (err) {
        console.error('Error from updateUserInfo', err);
        next(err);
    }
};
userController.deleteUser = async(req,res,next) => {
    try {
        const userId = req.user.id;

        const user = await userServices.deleteUser(userId);
        res.json({massage: `delete ${user.username} success`});

    }catch (err) {
        console.log('Error from deleteUser controller', err)
        next(err)
    }
}




module.exports = userController;