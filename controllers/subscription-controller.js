const omiseServices = require("../services/omise");
const subscriptionServices = require("../services/subscription-services");
const createError = require("../utils/createError");


const subscriptionController = {};

subscriptionController.checkSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log(user, 'user')

        if (!userId) {
            return next(createError(400, 'userId is required'));
        }

        const subscription = await subscriptionServices.checkSubscription(userId);

        if (!subscription) {
            return res.json({ active: false, message: 'No active subscription found.' });
        }

        const isActive = subscription.status === 'ACTIVE';

        return res.json({
            active: isActive,
            subscription,
            message: isActive ? 'Active subscription found.' : 'Subscription is not active.',
        });
    } catch (err) {
        console.error('Error in checkSubscription:', err);
    }
};
subscriptionController.createSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return createError(400, 'userId is require')
        }

        const { plan } = req.body;
        if (!plan) {
            return createError(400, 'You have to select the plan')
        }

        const existingSubscription = await subscriptionServices.checkSubscription(userId);
        if (existingSubscription) {
            return res.status(400).json({ message: 'User already has an active subscription.' });
        }

        const newSubscription = await subscriptionServices.createSub(userId, plan)
        res.json(newSubscription);
    } catch (err) {
        console.log('error form getVocabCategory', err)
        next(err)
    }
};
subscriptionController.cancelSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const subscription = await subscriptionServices.checkSubscription(userId);
        if (!subscription || subscription.status !== 'ACTIVE') {
            return res.json({ status: false, message: 'No active subscription found.' });
        }

        const canceledSubscription = await subscriptionServices.cancelSubscription(userId);

        res.json({ message: 'Subscription canceled successfully!', canceledSubscription });
    } catch (err) {
        console.error('Error in cancelSubscription:', err);
        next(err);
    }
};
subscriptionController.renewSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return createError(400, 'userId is require')
        }

        const subscription = await subscriptionServices.checkSubscription(userId);
        if (!subscription) {
            return res.status(400).json({ message: 'No active subscription to renew.' });
        }

        const renewedSubscription = await subscriptionServices.renewSubscription(subscription.id);
        res.json(renewedSubscription);
    } catch (err) {
        next(err);
    }
};
subscriptionController.createCharge = async (req, res, next) => {
    try {
        const user = req.user;

        // ตรวจสอบว่าผู้ใช้มีอยู่
        if (!user) {
            return res.status(400).json({ message: 'User is required' });
        }

        const { plan, token } = req.body;
        if (!plan || !token) {
            return res.status(400).json({ message: 'Plan and token are required' });
        }

        // สร้างลูกค้า
        const customer = await omiseServices.createCustomer(user.email, plan, token);

        const priceMap = {
            ONE_MONTH: 99 * 100,
            SIX_MONTH: 505 * 100,
            TWELVE_MONTH: 713 * 100,
        };

        const amount = priceMap[plan];
        if (!amount) {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        const charge = await omiseServices.createSubscription(amount, plan, customer);

        if (charge.status === "pending") {
            return res.json({ message: "Payment pending", charge });
        } else if (charge.status === "successful") {
            const subscription = await subscriptionServices.createSubscription(user.id, plan);
            return res.json({
                message: "Payment successful",
                subscription,
                charge,
            });
        } else {
            return res.status(400).json({ message: "Payment failed", charge });
        }
    } catch (err) {
        console.error("Payment Error:", err);
        next(err);
    }
};
subscriptionController.createBankCharge = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const { plan, token } = req.body;
        if (!plan || !token) {
            return res.status(400).json({ message: 'Plan and token are required' });
        }

        const priceMap = {
            ONE_MONTH: 99 * 100,
            SIX_MONTH: 505 * 100,
            TWELVE_MONTH: 713 * 100,
        };

        const amount = priceMap[plan];
        if (!amount) {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        const charge = await omiseServices.createBankSubscription(amount, plan, token);

        if (charge.status === "pending") {
            return res.json({ message: "Payment pending", charge });
        } else if (charge.status === "successful") {
            const subscription = await subscriptionServices.createSubscription(userId, plan);

            return res.json({
                message: "Payment successful",
                subscription,
                charge,
            });
        } else {
            return res.status(400).json({ message: "Payment failed", charge });
        }
    } catch (err) {
        console.error("Payment Error:", err);
        next(err);
    }
};


module.exports = subscriptionController;