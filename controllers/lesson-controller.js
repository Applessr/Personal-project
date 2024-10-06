const lessonServices = require('../services/lesson-service'); 
const createError = require('../utils/createError');

const lessonController = {};


lessonController.getAllLessons = async (req, res, next) => {
    try {
        const lessons = await lessonServices.getAllLessons(); 
        if(!lessons || lessons.length === 0)  {
            return createError(404, 'No lessons found in the database')
        }
        res.status(200).json(lessons); 
    } catch (err) {
        console.log('Error from getAllLessons:', err); 
        next(err); 
    }
};


lessonController.getLessonById = async (req, res, next) => {
    try {
        const { lessonsId } = req.params; 
        if(!lessonsId) {
            return createError(400, 'lessons ID is require')
        }
        const lesson = await lessonServices.getLessonById(lessonsId); 
        if (!lesson) {
            return createError(404,'Lesson not found'); 
        }
        res.status(200).json(lesson); 
    } catch (err) {
        console.log('Error from getLessonById:', err); 
        next(err); 
    }
};

module.exports = lessonController;