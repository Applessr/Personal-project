const vocabServices = require("../services/vocab-service");
const createError = require("../utils/createError");

const vocabularyController = {};

vocabularyController.getVocabCategory = async(req,res,next) => {
    try {
        const getVocabCategory = await vocabServices.getVocabCategory();
        if(!getVocabCategory || getVocabCategory.length === 0) {
            return createError(404, 'No Category found in the database')
        }
        res.status(200).json(getVocabCategory);
    }catch(err) {
        console.log('error form getVocabCategory',err)
        next(err)
    }
}
vocabularyController.getVocabCategoryId = async(req,res,next) => {
   
    try {
        const { vocabularyId } = req.params; 
        if(!vocabularyId) {
            return createError(400,'vocabularyId is require')
        }
        const getVocabByCategoryId = await vocabServices.getVocabCategoryId(vocabularyId);
        if (!getVocabByCategoryId) {
            return createError(404, 'vocabulary not found')
        }
        res.status.json(getVocabByCategoryId);
    }catch(err) {
        console.log('error form getVocabCategoryId',err)
        next(err)
    }
}



module.exports = vocabularyController;