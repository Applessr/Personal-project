const prisma = require("../config/prisma");


const favoriteService = {};

favoriteService.findUniqueVocab = async (userId, vocabularyId) => {
    return await prisma.favorite.findUnique({
      where: {
        userId_vocabularyId: {
          userId: userId, 
          vocabularyId: Number(vocabularyId) 
        }
      }
    });
  };
favoriteService.getUserFavorite = async (userId) => {
    return await prisma.favorite.findMany({
        where: {
            userId: Number(userId),
        },
        include: {
            vocabulary: {
                select: {
                    wordTh: true,
                    wordEs: true,
                    image: true,
                },
            },
        },
    });
};
favoriteService.addUserFavorite = async (userId, vocabularyId) => {
    return await prisma.favorite.create({
        data: {
            userId: Number(userId),
            vocabularyId: Number(vocabularyId),
        },
    });
};

favoriteService.deleteUserFavorite = async (userId, vocabularyId) => {
    return await prisma.favorite.delete({
        where: {
            userId_vocabularyId: {
                userId: userId,
                vocabularyId: Number(vocabularyId)
            }
        }
    });
};
module.exports = favoriteService;