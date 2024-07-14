
import { Schema, model } from 'mongoose'

export const visibility = ['public', 'private']

//  the collection of the user

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    taskScope: { type: String, enum: visibility, required: true },
    task: { type: [String] },
    taskType:{type:String}
})

export const Task = model('Task', taskSchema)