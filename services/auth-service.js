const prisma = require('../config/prisma');
const crypto = require('crypto');


const authServices = {};

authServices.getEmail = async(email) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};
authServices.getUsername = async(username) => {
    return await prisma.user.findUnique({
        where: {
            username,
        },
    });
};
authServices.findUserById = async(id) => {
    return await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
};
authServices.createUser = async(data) => {
    return await prisma.user.create({
        data,
    });
};
authServices.getCurrentUser = async(email) => {
    return await prisma.user.findUnique({
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
authServices.updateResetPassword = async(email, token, expiryDate) => {
    return await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: expiryDate
        },
    });
};
authServices.updatePassword = async(userId, hashedPassword) => {
    return await prisma.user.update({
        where: { 
            id: Number(userId) 
        },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });
};

module.exports = authServices;