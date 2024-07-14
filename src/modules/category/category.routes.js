import {Router} from 'express'
import { createCategoryValidation, updateCategoryValidation } from './category.validation.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { verifyToken } from '../../middlewares/verifyToken.middleware.js'
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from './category.controller.js'


export const categoryRouter =Router()

categoryRouter.post('/createCategory',verifyToken,validate(createCategoryValidation),createCategory)
categoryRouter.get('/getAllCategories', verifyToken, getAllCategories)
categoryRouter.get('/getCategoryById/:id', verifyToken, getCategoryById)
categoryRouter.put('/updateCategoryById/:id', verifyToken, validate(updateCategoryValidation), updateCategoryById)
categoryRouter.delete('/deleteCategoryById/:id', verifyToken, deleteCategoryById)