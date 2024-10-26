const prisma = require("../config/prisma");


const subscriptionServices = {};


subscriptionServices.checkSubscription = async (userId) => {
    return await prisma.subscription.findUnique({
        where: {
            userId: Number(userId),
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                }
            },
        },
    });
};
subscriptionServices.createSubscription = async (userId, plan) => {
    const now = new Date();
    const endDate = new Date();

    switch (plan) {
        case 'ONE_MONTH':
            endDate.setMonth(now.getMonth() + 1);
            break;
        case 'SIX_MONTH':
            endDate.setMonth(now.getMonth() + 6);
            break;
        case 'TWELVE_MONTH':
            endDate.setMonth(now.getMonth() + 12);
            break;
        default:
            throw new Error('Invalid subscription plan');
    }

    try {
        return await prisma.subscription.create({
            data: {
                startDate: now,
                endDate: endDate,
                status: 'ACTIVE',
                plan: plan,
                user: { connect: { id: userId } },
            },
        });
    } catch (error) {
        console.error("Failed to create subscription:", error);
        throw new Error("Could not create subscription. Please try again later.");
    }
};

subscriptionServices.cancelSubscription = async (userId) => {
    return await prisma.subscription.update({
        where: {
            userId: Number(userId),
        },
        data: {
            status: 'CANCELED',
        },
    });
};
subscriptionServices.renewSubscription = async (id) => {
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(now.getMonth() + 1);

    return await prisma.subscription.update({
        where: {
            id: Number(id),
        },
        data: {
            startDate: now,
            endDate: endDate,
            status: 'ACTIVE',
        },
    });
};


module.exports = subscriptionServices;