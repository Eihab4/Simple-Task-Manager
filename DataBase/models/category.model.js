import { Schema, model } from 'mongoose'

// the collection of the category
const categorySchema = new Schema({
    name: { type: String, required: true },
    ownedBy:{type:Schema.Types.ObjectId,ref:'User'}
})


export const Category = model('Category', categorySchema)
