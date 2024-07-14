import { Router } from "express";
import { createTaskValidation, updateTaskValidation } from "./task.validation.js";
import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById } from "./task.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";



export const taskRouter = Router()

taskRouter.post('/createTask', verifyToken, validate(createTaskValidation), createTask)
taskRouter.get('/getTaskById/:id', verifyToken, getTaskById)
taskRouter.put('/updateTaskById/:id', verifyToken, validate(updateTaskValidation), updateTaskById)
taskRouter.delete('/deleteTaskById/:id', verifyToken, deleteTaskById)
taskRouter.get('/getAllTasks',verifyToken, getAllTasks)

