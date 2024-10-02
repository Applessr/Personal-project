const prisma = require('../config/prisma');
const crypto =require('crypto');


const authServices = {};

authServices.getEmail = (email) => {
    return prisma.user.findUnique({
        where : {
            email,
        },
    });
};
authServices.getUsername = (username) => {
    return prisma.user.findUnique({
        where : {
            username,
        },
    });
};
authServices.findUserById = (id) => {
    return prisma.user.findUnique({
        where : {
            id : Number(id),
        },
    });
};
authServices.createUser = (data) => {
    return prisma.user.create({
        data,
    });
};
// authServices.createResetPassword = async(email) => {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     return { resetToken, hashedToken };
// };
// authServices.saveResetToken = async (userId, hashedToken) => {
//     const expiresIn = Date.now() + 10 * 60 * 1000;

//     await prisma.user.update({
//         where: { id: userId },
//         data: {
//             resetPasswordToken: hashedToken,
//             resetPasswordExpires: expiresIn 
//         }
//     });
// };
// authServices.sendResetEmail = async (email, resetToken) => {
//     const resetURL = `https://your-app.com/reset-password?token=${resetToken}`;

//     await emailService.send({
//         to: email,
//         subject: 'Password Reset Request',
//         text: `Click the link to reset your password: ${resetURL}`
//     });
// };
// authServices.verifyResetToken = async (resetToken) => {
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     const user = await prisma.user.findFirst({
//         where: {
//             resetPasswordToken: hashedToken,
//             resetPasswordExpires: {
//                 gt: Date.now()
//             }
//         }
//     });

//     if (!user) {
//         throw new Error('Token is invalid or has expired');
//     }

//     return user.id;
// };
// authServices.updatePassword = async (userId, newPassword) => {
//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     await prisma.user.update({
//         where: { id: userId },
//         data: {
//             password: hashedPassword,
//             resetPasswordToken: null, 
//             resetPasswordExpires: null 
//         }
//     });
// };
authServices.getCurrentUser = (email) => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        },
    });
};

module.exports = authServices;