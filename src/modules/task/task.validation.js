import Joi from "joi";
import { visibility } from "../../../DataBase/models/task.model.js";

export const createTaskValidation = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    dueDate: Joi.date().iso().required(),
    category: Joi.string().hex().length(24).required(),
    assignedTo: Joi.string().hex().length(24).required(),
    taskScope: Joi.string().valid(...visibility).required(),
    createdAt: Joi.date().iso().required(),
    task: Joi.array().items(Joi.string()).required()

})

export const updateTaskValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(500),
    dueDate: Joi.date().iso(),
    category: Joi.string().hex().length(24),
    assignedTo: Joi.string().hex().length(24),
    taskScope: Joi.string().valid(...visibility),
    task: Joi.array().items(Joi.string())

})
