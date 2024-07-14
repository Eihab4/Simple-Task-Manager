process.on('uncaughtException', err => {
});

import express from 'express'
import { dbConnection } from './DataBase/dbConnection.js'
import { globalError } from './src/middlewares/globalError.middleware.js'
import { taskRouter } from './src/modules/task/task.routes.js';
import { userRouter } from './src/modules/user/user.routes.js';
import { categoryRouter } from './src/modules/category/category.routes.js';
import { AppError } from './src/utils/AppError.utils.js';

const app = express()
const port = 3000
app.use(express.json())
app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use('/category',categoryRouter)

app.use("*", (req, res, next) => {
    next(new AppError(`path error ${req.originalUrl}`, 404));
});
app.use(globalError)
process.on('unhandledRejection', err => {
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
