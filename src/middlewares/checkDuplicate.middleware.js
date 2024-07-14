import { User } from "../../DataBase/models/user.model.js";
import { catchError } from "./catchError.middleware.js";


export const checkDuplicate = catchError(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });

    if (user) {
        return next(new AppError('Email already exists',400));
    }
    next();
})