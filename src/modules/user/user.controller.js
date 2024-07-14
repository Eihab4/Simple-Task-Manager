import bcrypt from 'bcrypt';
import { User } from '../../../DataBase/models/user.model.js';
import { catchError } from '../../middlewares/catchError.middleware.js';
import jwt from 'jsonwebtoken'



export const signUp = catchError(async (req, res, next) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = undefined;
    res.status(201).json({ message: 'User created successfully', user });
});

export const signIn = catchError(async (req, res, next) => { 
    const {email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user || !bcrypt.hashSync(password, user.password)) {
        return next(new AppError('invalid email or password',400));
    }
    const payload = {
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign(payload, 'simpleTaskManagerSecretKey');
    res.status(200).json({ message: "Login successful", token });
})