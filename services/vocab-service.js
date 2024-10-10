const prisma = require("../config/prisma");


const vocabServices = {};


vocabServices.getVocabCategory = async() => {
    return await prisma.category.findMany({});
};
vocabServices.getAllVocab = async() => {
    return await prisma.vocabulary.findMany({});
};
vocabServices.getVocabCategoryId = async(id) => {
    const vocabCategoryId = await prisma.category.findUnique({
        where: {id:Number(id)},
        include: {
            vocabulary: true,
        },
    });
    if (!vocabCategoryId) {
        throw new Error('vocabulary not found'); 
    }
    return vocabCategoryId; 
};

module.exports = vocabServices;