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
        const { vocabularyId } = req.params;
        if(!userId) {
            return createError(400,'user ID is require')
        } 

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
favoriteController.deleteUserFavorite = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { vocabularyId } = req.params; 
        console.log(req.params)
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!vocabularyId) {
            return res.status(400).json({ message: 'Vocabulary ID is required' });
        }

        const isFavorite = await favoriteService.findUniqueVocab(userId, vocabularyId);
        if (!isFavorite) {
            return res.status(404).json({ message: 'Favorite not found for this user and vocabulary' });
        }

        await favoriteService.deleteUserFavorite(userId, vocabularyId);
        return res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (err) {
        console.log('Error in deleteUserFavorite:', err);
        next(err);
    }
};
module.exports = favoriteController;