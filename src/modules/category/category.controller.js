import { Category } from "../../../DataBase/models/category.model.js";
import { catchError } from "../../middlewares/catchError.middleware.js";

export const createCategory = catchError(async (req, res, next) => {
    const { name, description } = req.body;
    const category = new Category({name, description});
    await category.save();
    res.status(201).json({ category });
})

export const getAllCategories = catchError(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided

    const categories = await Category.find({})
        .limit(limit * 1) // Convert limit to a number
        .skip((page - 1) * limit)
        .exec();

    // Get total number of categories for pagination metadata
    const count = await Category.countDocuments();

    res.status(200).json({
        message: 'Categories retrieved successfully',
        categories,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
    });
});

export const updateCategoryById = catchError(async (req, res, next) => { 
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    res.json({ message: "Category updated successfully", category });
});


export const getCategoryById = catchError(async (req, res, next) => { 
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    res.json({ category });
})

export const deleteCategoryById = catchError(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    res.json({ message: "Category deleted successfully" });
})



