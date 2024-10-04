const lessonServices = require('../services/lesson-service'); 
const createError = require('../utils/createError');

const lessonController = {};


lessonController.getAllLessons = async (req, res, next) => {
    try {
        const lessons = await lessonServices.getAllLessons(); 
        res.json(lessons); 
    } catch (err) {
        console.log('Error from getAllLessons:', err); 
        next(err); 
    }
};


lessonController.getLessonById = async (req, res, next) => {
    const { lessonsId } = req.params; 
    try {
        const lesson = await lessonServices.getLessonById(lessonsId); 
        if (!lesson) {
            return createError(400,'Lesson not found'); 
        }
        res.json(lesson); 
    } catch (err) {
        console.log('Error from getLessonById:', err); 
        next(err); 
    }
};

module.exports = lessonController;