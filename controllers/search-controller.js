const searchServices = require("../services/Search-service");

const searchController = {};

searchController.getSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;
        console.log(req.user)       
        const getUserSearch = await searchServices.getSearch(userId);
        res.status(200).json({getUserSearch})
    }catch(err) {
        console.log('error form getSearch',err)
        next(err)
    }
}
searchController.createSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;

        const {searchTerm} = req.body;
        const createSearch = await searchServices.createSearch(userId,searchTerm)
        res.status(201).json({createSearch});
    } catch (err) {
        console.log('error form createSearch',err)
        next(err)
    }
}
searchController.deleteSearch = async(req,res,next) => {
    try {
        const userId = req.user.id;
        const { historyId } = req.params;
        console.log(req.params)
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