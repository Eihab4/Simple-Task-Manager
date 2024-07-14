import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { signInValidationSchema, signUpValidationSchema } from "./user.validation.js";
import { checkDuplicate } from "../../middlewares/checkDuplicate.middleware.js";
import { signIn, signUp } from "./user.controller.js";



export const userRouter = Router();

userRouter.post('/signUp', validate(signUpValidationSchema), checkDuplicate, signUp)
userRouter.post('/signIn', validate(signInValidationSchema), signIn)

