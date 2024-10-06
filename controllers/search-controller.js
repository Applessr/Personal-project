const searchServices = require("../services/Search-service");
const createError = require("../utils/createError");

const searchController = {};

searchController.getSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return createError(400,'user ID is require')
        }     

        const getUserSearch = await searchServices.getSearch(userId);
        if(!getUserSearch ||getUserSearch.length === 0) {
            return createError(404,'no search history found')
        }

        res.status(200).json(getUserSearch)
    }catch(err) {
        console.log('error form getSearch',err)
        next(err)
    }
}
searchController.createSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return createError(400,'user ID is require')
        }

        const {searchTerm} = req.body;
        if(!searchTerm) {
            return createError(400, 'searchTerm is require')
        }

        const createSearch = await searchServices.createSearch(userId,searchTerm)
        res.status(201).json(createSearch);
    } catch (err) {
        console.log('error form createSearch',err)
        next(err)
    }
}
searchController.deleteSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return createError(400,'user ID is require')
        }

        const { historyId } = req.params;
        if (!historyId) {
            return res.status(400).json({ message: 'Search ID is required' });
        }
        
        const search = await searchServices.deleteSearch(userId,historyId);
        res.status(204).json({message: 'Search history deleted successfully'});
    }catch (err) {
        console.log('error form deleteSearch',err)
        next(err)
    }
}


module.exports = searchController;