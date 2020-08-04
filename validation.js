// Validation
const Joi = require('@hapi/joi')

// Register validation
const registerValidation = (data) => {
   const schema = Joi.object({
      users_first_name: Joi.string()
         .min(3)
         .required(),
      users_last_name: Joi.string()
         .min(3)
         .required(),
      users_email: Joi.string()
         .min(6)
         .required()
         .email(),
      users_password: Joi.string()
         .min(6)
         .required()
   })

   return schema.validate(data)
}

// Login validation
const loginValidation = data => {
   const schema = Joi.object({
      users_email: Joi.string()
         .min(6)
         .required()
         .email(),
      users_password: Joi.string()
         .min(6)
         .required()
   })

   return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation