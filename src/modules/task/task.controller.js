import { Category } from "../../../DataBase/models/category.model.js";
import { Task } from "../../../DataBase/models/task.model.js";
import { catchError } from "../../middlewares/catchError.middleware.js";
import { AppError } from '../../utils/AppError.utils.js';

export const createTask = catchError(async (req, res, next) => {
    // Create a new task instance with data from the request body
    const newTask = new Task(req.body);

    // Determine taskType based on the 'task' field in the request body
    if (newTask.task && Array.isArray(newTask.task) && newTask.task.length > 1) {
        newTask.taskType = 'list Task'; // Set taskType to 'list Task' if 'task' is an array with more than one item
    } else {
        newTask.taskType = 'text Task'; // Otherwise, set taskType to 'text Task'
    }

    // Save the new task to the database
    await newTask.save();

    // Respond with a success message and the newly created task
    res.status(201).json({ message: 'Task created successfully', newTask });
});




export const getAllTasks = catchError(async (req, res, next) => {
    const { categoryName, taskScope, page = 1, limit = 10 } = req.query;

    let query = {};

    // Filter by task scope (public/private)
    if (taskScope === 'private') {
        if (!req.user ) {
            return next(new AppError('User ID not found in request', 403));
        }
        if (!req.user.id ) {
            return next(new AppError('User ID not found in request2', 403));
        }
        query.taskScope = 'private';
        query.assignedTo = req.user.id; // Ensure req.user._id is correctly populated
    } else {
        // Default to public if no taskScope is provided
        query.taskScope = 'public';
    }

    // Filter by category name
    if (categoryName) {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
            query.category = category._id;
        } else {
            return next(new AppError("No category found with this name", 404));
        }
    }
    const tasks = await Task.find(query)
        .populate('category', 'name')
        .limit(limit * 1) // Convert limit to a number
        .skip((page - 1) * limit)
        .exec();

    // Get total number of tasks for pagination metadata
    const count = await Task.countDocuments(query);

    if (tasks.length === 0) {
        return next(new AppError("No tasks found", 404));
    }

    res.status(200).json({
        message: 'Tasks retrieved successfully',
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
    });
});






// to retrieve a task by its id

export const getTaskById = catchError(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new AppError("Task not found", 404));
    }
    res.json({ message: "Task retrieved successfully", task });
});

// to update a task by its id

export const updateTaskById = catchError(async (req, res, next) => {
    let updatedTask = await Task.findById(req.params.id);
    if (updatedTask.assignedTo != req.user.id) {
        return next(new AppError("You don't have permission to update this task", 403));
    }
    if (!updatedTask) {
        return next(new AppError("Task not found", 404));
    }
    updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Task updated successfully", updatedTask });
});

// to delete a task by its id

export const deleteTaskById = catchError(async (req, res, next) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
        return next(new AppError("Task not found", 404));
    }
    res.json({ message: "Task deleted successfully" });
});