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
      users_phone: Joi.string()
         .max(10)
         .required(),
      users_email: Joi.string()
         .required()
         .email(),
      users_password: Joi.string()
         .min(6)
         .max(16)
         .required(),
      users_confirm_password: Joi.string()
         .min(6)
         .max(16)
         .required()
   })

   return schema.validate(data)
}

// Login validation
const loginValidation = data => {
   const schema = Joi.object({
      users_email: Joi.string()
         .required()
         .email(),
      users_password: Joi.string()
         .required()
   })

   return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation