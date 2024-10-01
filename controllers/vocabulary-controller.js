const vocabServices = require("../services/vocab-service");
const createError = require("../utils/createError");

const vocabularyController = {};

vocabularyController.getVocabCategory = async(req,res,next) => {
    try {
        const getVocabCategory = await vocabServices.getVocabCategory();
        res.json(getVocabCategory);
    }catch(err) {
        console.log('error form getVocabCategory',err)
        next(err)
    }
}
vocabularyController.getVocabCategoryId = async(req,res,next) => {
    const { id } = req.params; 
    try {
        const getVocabByCategoryId = await vocabServices.getVocabCategoryId(id);
        if (!getVocabByCategoryId) {
            return createError(400, 'vocabulary not found')
        }
        res.json(getVocabByCategoryId);
    }catch(err) {
        console.log('error form getVocabCategoryId',err)
        next(err)
    }
}



module.exports = vocabularyController;