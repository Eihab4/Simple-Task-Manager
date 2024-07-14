import mongoose from "mongoose";


// Connect to MongoDB

export const dbConnection = mongoose.connect('mongodb://localhost:27017/simpleTaskManager').then(
    () => console.log('Connected to MongoDB')
).catch(() => console.log('Failed to connect to MongoDB'))
