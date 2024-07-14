import Joi from 'joi';

export const createCategoryValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    ownedBy: Joi.string().hex().length(24).required()
})

export const updateCategoryValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).max(20),
    ownedBy: Joi.string().hex().length(24)
})
