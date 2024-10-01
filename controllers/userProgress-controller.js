const userServices = require("../services/user-service");

const userProgressController = {};

userProgressController.getAllProgress = async (req, res, next) => {
    try {
        const progress = await userServices.getAllProgress(req.user.id);
        res.json(progress);
    } catch (err) {
        next(err);
    }
};

userProgressController.getProgressByLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const progress = await userServices.getProgressByLesson(req.user.id, lessonId);
        res.json(progress);
    } catch (err) {
        next(err);
    }
};

userProgressController.updateProgress = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const { score, attempts } = req.body;
        await userServices.updateProgress(req.user.id, lessonId, { score, attempts });
        res.json({ message: "User progress updated successfully" });
    } catch (err) {
        next(err);
    }
};

userProgressController.createProgress = async (req, res, next) => {
    try {
        const { lessonId, score } = req.body;
        await userServices.createProgress(req.user.id, lessonId, score);
        res.json({ message: "User progress created successfully" });
    } catch (err) {
        next(err);
    }
};


module.exports = userProgressController;