const createError = require('../utils/createError');

const omise = require('omise')({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

const omiseServices = {};

omiseServices.createCustomer = async (email, plan, token) => {
    try {
        return await omise.customers.create({
            email,
            currency: "thb",
            description: `Subscription for ${plan}`,
            card: token,
        });
    } catch (err) {
        console.error("Error creating customer:", err);
        throw err;
    }
};

omiseServices.createSubscription = async (amount, plan, customer) => {
    try {
        return await omise.charges.create({
            amount: amount,
            currency: "thb",
            description: `Subscription for ${plan}`,
            customer: customer.id
        });
    } catch (err) {
        console.error("Error creating charge:", err);
        throw err;
    }
};

omiseServices.createBankSubscription = async (amount, plan, token) => {
    try {
        const charge = await omise.charges.create({
            amount: amount,
            currency: "thb",
            description: `Subscription for ${plan}`,
            source: token,
        });

        return charge;
    } catch (err) {
        console.error("Error creating charge:", err);
        throw err;
    }
};



module.exports = omiseServices;