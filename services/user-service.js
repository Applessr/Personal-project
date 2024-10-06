const { number } = require("joi");
const prisma = require("../config/prisma");

const userServices = {};

userServices.updateUser = async (userId, user) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            username: user.username,
            email: user.email,
            password: user.password, 
        },
    });
};
userServices.deleteUser = async (userId) => {
    return await prisma.user.delete({
        where : {
            id: Number(userId)
        },
    });
};

userServices.getAllProgress = async (userId) => {
    return await prisma.userProgress.findMany({
        where: { userId },
        include: {
            lesson: true,  
        },
    });
};
userServices.getAllUserScore = async (lessonId) => {
    return await prisma.userProgress.findMany({
        where: {
            lessonId: Number(lessonId) 
        },
        include: {
            user: { 
                select: {
                    username: true, 
                }
            }
        },
        orderBy: {
            score: 'desc',
        },
    });
};
userServices.getProgressByLesson = async (userId, lessonId) => {
    return await prisma.userProgress.findUnique({
        where: {
            userId_lessonId: {
                userId: Number(userId),
                lessonId: Number(lessonId),
            },
        },
        include: {
            lesson: true,  
        },
    });
};

userServices.updateProgress = async (userId, lessonId, score) => {
    const currentProgress = await prisma.userProgress.findUnique({
        where: {
            userId_lessonId: { 
                userId: Number(userId),
                lessonId: Number(lessonId)
            }
        }
    });

    if (!currentProgress) {
        throw new Error('Progress not found'); 
    }

    return await prisma.userProgress.update({
        where: {
            userId_lessonId: { 
                userId: Number(userId), 
                lessonId: Number(lessonId) 
            }
        },
        data: {
            score: score.score, 
            attempts: currentProgress.attempts + 1, 
        }
    });
};

userServices.createProgress = async (userId, lessonId, score) => {
    return await prisma.userProgress.create({
        data: {
            userId: Number(userId),
            lessonId: Number(lessonId),
            score,
            attempts: 1, 
        },
    });
};



module.exports = userServices;