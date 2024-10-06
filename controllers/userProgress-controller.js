const userServices = require("../services/user-service");
const createError = require("../utils/createError");

const userProgressController = {};

userProgressController.getAllProgress = async (req, res, next) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return createError(400,'user ID is require')
        } 
        const progress = await userServices.getAllProgress(userId);
        if(!progress || progress.length === 0 ) {
            return createError(404,'no progress found')
        }
        res.status(200).json(progress);
    } catch (err) {
        console.log('error in getAllProgress', err)
        next(err);
    }
};
userProgressController.getAllUserScore = async (req, res, next) => {
    try {
        const {lessonId} = req.params; 
        if(!lessonId) {
            return createError(400,'lesson ID is require')
        } 
        const scores = await userServices.getAllUserScore(lessonId); 
        if(!scores || scores.length === 0 ) {
            return createError(404,'no scores found')
        }
        res.status(200).json(scores);
    } catch (err) {
        console.log('error in getAllUserScore', err);
        next(err);
    }
};

userProgressController.updateProgress = async (req, res, next) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return createError(400,'user ID is require')
        }

        const { lessonId } = req.params;
        if(!lessonId) {
            return createError(400,'lesson ID is require')
        } 

        const { score } = req.body;
        if(!score) {
            return createError(404,'score is require')
        }
        
        await userServices.updateProgress(userId, lessonId, { score });
        res.json({ message: "User progress updated successfully" });
    } catch (err) {
        console.log('error in updateProgress', err)
        next(err);
    }
};

userProgressController.createProgress = async (req, res, next) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return createError(400,'user ID is require')
        }

        const {lessonId} = req.params
        if(!lessonId) {
            return createError(400,'lesson ID is require')
        } 

        const { score } = req.body;
        if(!score) {
            return createError(404,'score is require')
        }

        await userServices.createProgress(userId, lessonId, score);
        res.json({ message: "User progress created successfully" });
    } catch (err) {
        console.log('error in createProgress',err)
        next(err);
    }
};


module.exports = userProgressController;