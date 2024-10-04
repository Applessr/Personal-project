const adminServices = require("../services/admin-service");

const adminController = {};


adminController.getUserList = async(req,res,next) => {
    try {
        const userList = await adminServices.getAllUser();
        res.json({userList});
    }catch (err) {
        console.log('error from getUserList', err)
        next(err)
    }
}
adminController.updateUserRole = async(req,res,next) => {
    try {
        const {userId} = req.params
        const { role } = req.body
        const user = await adminServices.updateUserRole(userId,role)
        res.json({message: `update ${user.username} to role: ${user.role} success`})
    }catch (err) {
        console.log('error from updateUserRole controller', err)
        next(err)
    }
}
adminController.getVocabList = async(req,res,next) => {
    try {
        const vocabList = await adminServices.getVocabList();
        res.json({vocabList});
    }catch (err) {
        console.log('error from getVocabList', err)
        next(err)
    }
}
adminController.addVocabulary = async(req,res,next) => {
    try {
        const newVocabulary = req.body; 
        const createdVocabulary = await adminServices.addVocabulary(newVocabulary);
        res.json({createdVocabulary});
    }catch (err) {
        console.log('error from addVocabulary', err)
        next(err)
    }
}
adminController.updateVocabulary = async(req,res,next) => {
    try {

    }catch(err) {
        console.log('error from updateVocabulary', err)
        next(err)
    }
}
adminController.deleteVocabulary = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Vocabulary ID is required' });
        }
        const deletedVocabulary = await adminServices.deleteVocabList(id);
        res.json({ message: 'Vocabulary deleted successfully', deletedVocabulary });
    } catch (error) {
        console.error('error from deleteVocabulary', error);
        next(error);
    }
};

module.exports = adminController