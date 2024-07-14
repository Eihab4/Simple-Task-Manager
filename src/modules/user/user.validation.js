import Joi from "joi"


// the schema for validating the user data for signing up
export const signUpValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
    rePassword:Joi.valid(Joi.ref("password")).required(),
    email: Joi.string().email().required(),
})



// the schema for validating the user data for login
export const signInValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
})

