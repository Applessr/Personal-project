const favoriteService = require("../services/favorite-service");
const createError = require("../utils/createError");

const favoriteController = {};

favoriteController.getUserFavorite = async(req,res,next) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return createError(400,'user ID is require')
        } 

        const favorite = await favoriteService.getUserFavorite(userId);
        if(!favorite ||favorite.length === 0) {
            return createError(404,'no favorite vocabulary found')
        }
        res.status(200).json(favorite)
    } catch (err) {
        console.log('error in getUserFavorite', err)
        next(err)
    }
}
favoriteController.addUserFavorite = async(req, res, next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return createError(400,'user ID is require')
        } 

        const { vocabularyId } = req.params;
        if(!vocabularyId) {
            return createError(400,'vocabulary ID is require')
        } 

        const isVocabularyExist = await favoriteService.findUniqueVocab(userId, vocabularyId);
        if (isVocabularyExist) {
            return res.status(400).json({ error: 'This vocabulary is already added to your favorites' });
        }

        const favorite = await favoriteService.addUserFavorite(userId, vocabularyId);
        res.status(201).json({ message: 'Vocabulary added to favorites' });
    } catch (err) {
        console.log('Error in addUserFavorite', err);
        next(err);
    }
};
favoriteController.deleteUserFavorite = async(req,res,next) => {
  try {
    const userId = req.user.id;
    if(!userId) {
        return createError(400,'user ID is require')
    } 
    const {favoriteId} = req.params;
    if (!favoriteId) {
        return res.status(400).json({ message: 'Favorite ID is required' });
    }

    const favorite = await favoriteService.deleteUserFavorite(userId,favoriteId)
    res.status(204).json({message: 'already delete vocabulary in your favorite'})
  } catch(err) {
    console.log('error in deleteUserFavorite',err)
    next(err)
  }
}


module.exports = favoriteController;