const prisma = require('../config/prisma'); 

const lessonServices = {};


lessonServices.getAllLessons = async () => {
    return await prisma.lesson.findMany({});
};

lessonServices.getLessonById = async (id) => {
    const lesson = await prisma.lesson.findUnique({
        where: { id: Number(id) },
        include: {
            questions: true,
        },
    });
    if (!lesson) {
        throw new Error('Lesson not found'); 
    }
    return lesson; 
};
module.exports = lessonServices;