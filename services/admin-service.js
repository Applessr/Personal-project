const prisma = require("../config/prisma");

const adminServices = {};

adminServices.getAllUser = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                updatedAt: true,
            },
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
adminServices.updateUserRole = async (userId, role) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                role,
            }
        });
        return user;
    } catch (error) {
        console.error("Error update role :", error);
        throw error;
    }
};
adminServices.getVocabList = async () => {
    try {
        const vocabList = await prisma.vocabulary.findMany({});
        return vocabList;  
    } catch (error) {
        console.error("Error getVocabList:", error);
        throw error;  
    }
};
adminServices.addVocabulary = async (newVocabulary) => {
    try {
        const existingVocabulary = await prisma.vocabulary.findFirst({
            where: {
                wordTh: newVocabulary.wordTh,
                categoryId: newVocabulary.categoryId,
            },
        });

        if (existingVocabulary) {
            return {
                success: false,
                message: 'Vocabulary already exists in this category',
            };
        }

        const createdVocabulary = await prisma.vocabulary.create({
            data: {
                wordTh: newVocabulary.wordTh,
                wordEs: newVocabulary.wordEs,
                image: newVocabulary.image,
                categoryId: newVocabulary.categoryId,
            },
        });

        return {
            success: true,
            createdVocabulary,
        };
    } catch (error) {
        console.error("Error in addVocabulary service:", error);
        throw error;
    }
};
adminServices.updateVocab = async (vocabularyId,updateData) => {
    return await prisma.vocabulary.update({
        where: {
            id: Number(vocabularyId), 
        },
        data: {
            wordTh: updateData.wordTh,
            wordEs: updateData.wordEs,
            image: updateData.image,
            categoryId: updateData.categoryId,
        },
    });
};

adminServices.deleteVocabList = async (vocabularyId) => {
    try {
        const vocabList = await prisma.vocabulary.delete({
            where: {
                id: Number(vocabularyId),
            },
        });
        return vocabList;
    } catch (error) {
        console.error("Error in deleteVocabList service:", error);
        throw error;
    }
};

module.exports = adminServices;