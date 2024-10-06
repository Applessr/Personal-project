const adminServices = require("../services/admin-service");
const createError = require("../utils/createError");

const adminController = {};


adminController.getUserList = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to access user information" });
        }

        const userList = await adminServices.getAllUser();
        res.status(200).json({ userList });
    } catch (err) {
        console.log('Error from getUserList:', err);
        next(err);
    }
};
adminController.updateUserRole = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to update user role" });
        }
        const { userId } = req.params
        const { role } = req.body
        const user = await adminServices.updateUserRole(userId, role)
        res.json({ message: `update ${user.username} to role: ${user.role} success` })
    } catch (err) {
        console.log('error from updateUserRole controller', err)
        next(err)
    }
}
adminController.getVocabList = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to access vocabulary information" });
        }
        const vocabList = await adminServices.getVocabList();
        res.json({ vocabList });
    } catch (err) {
        console.log('error from getVocabList', err)
        next(err)
    }
}
adminController.addVocabulary = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to add vocabulary" });
        }
        const newVocabulary = req.body;
        const createdVocabulary = await adminServices.addVocabulary(newVocabulary);
        res.json({ createdVocabulary });
    } catch (err) {
        console.log('error from addVocabulary', err)
        next(err)
    }
}
adminController.updateVocabulary = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to update vocabulary data" });
        }
        const {vocabularyId} = req.params
        const { wordTh, wordEs, image, categoryId } = req.body;

        const updatedData = {};

        if (wordTh) {
            updatedData.wordTh = wordTh;
        }
        if (wordEs) {
            updatedData.wordEs = wordEs;
        }
        if (image) {
            updatedData.image = image;
        }
        if (categoryId) {
            updatedData.categoryId = categoryId;
        }
        if (!updatedData) {
            return createError(400, 'updatedData is require')
        }
        const updateVocabulary = await adminServices.updateVocab(vocabularyId,updatedData)
        res.status(200).json({updateVocabulary})

    } catch (err) {
        console.log('error from updateVocabulary', err)
        next(err)
    }
}
adminController.deleteVocabulary = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "You don't have permission to delete vocabulary" });
        }
        const { vocabularyId } = req.params;
        if (!vocabularyId) {
            return res.status(400).json({ message: 'Vocabulary ID is required' });
        }
        const deletedVocabulary = await adminServices.deleteVocabList(vocabularyId);
        res.status(204).json({ message: 'Vocabulary deleted successfully', deletedVocabulary });
    } catch (error) {
        console.error('error from deleteVocabulary', error);
        next(error);
    }
};

module.exports = adminController