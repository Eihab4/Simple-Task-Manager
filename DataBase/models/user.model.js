import { Schema, model } from "mongoose";


// the collection of the user
const userSchema= new Schema({
    userName: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true},
})


export const User = model('User', userSchema)