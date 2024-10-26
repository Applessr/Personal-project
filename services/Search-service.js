const prisma = require("../config/prisma");

const searchServices = {};

searchServices.getSearchAll = async () => {
  return await prisma.searchHistory.findMany({
    select: {
      id: true,
      searchTerm: true,
      userId: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
searchServices.getSearch = async (userId) => {
  return await prisma.searchHistory.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
      searchTerm: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
searchServices.getSearchHistory = async (userId) => {
  return await prisma.searchHistory.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'asc'
    },
  });

},
  searchServices.createSearch = async (userId, searchTerm) => {
    return await prisma.searchHistory.create({
      data: {
        userId: Number(userId),
        searchTerm: searchTerm,
      }
    });
  };
searchServices.deleteSearch = async (userId, historyId) => {
  return await prisma.searchHistory.delete({
    where: {
      userId: Number(userId),
      id: Number(historyId)
    },
  });
};


module.exports = searchServices;