const Joi = require('joi')
const createError = require('../utils/createError')


const registerSchema = Joi.object({
    email: Joi.string()
    .email({tlds: false})
    .required()
    .messages({
        "string.empty" : "Email is require"
    }),
    username: Joi.string()
    .pattern(/^[0-9a-zA-Z]{3,}$/)
    .required()
    .messages({
        "string.empty" : "Username is require",
          "string.pattern.base" : "Username must contain a-z A-Z 0-9 and must be at least 3 characters."
    }),
    password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({ 
        "string.empty" : "Password is require",
        "string.pattern.base" : "Password must contain a-z A-Z 0-9 and must be at least 6 characters."
    })
});

const loginSchema = Joi.object({
  identifier: Joi.alternatives()
    .try(
      Joi.string()
        .email({ tlds: false })
        .messages({
          "string.email": "Please enter a valid email address",
          "string.empty": "Email is required if username is not provided"
        }),
      Joi.string()
        .pattern(/^[0-9a-zA-Z]{3,}$/)
        .messages({
          "string.pattern.base": "Username must contain only letters (a-z, A-Z) and numbers (0-9) and be at least 3 characters long",
          "string.empty": "Username is required if email is not provided"
        })
    )
    .required(),

  password: Joi.string()
    .required()
    .min(6)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long"
    })
})
.required();

const validateSchema = (schema) => (req, res, next) => {
    const {value,error} = schema.validate(req.body)
    if(error){
        return createError(400, error.details[0].message)
    }
    req.input = value
    next();
};


exports.registerValidator = validateSchema(registerSchema)
exports.loginValidator = validateSchema(loginSchema)


    
