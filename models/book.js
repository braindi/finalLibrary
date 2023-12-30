import mongoose from "mongoose";
import joi from 'joi';

const bookSchema = mongoose.Schema({
    name: { type: String, require: true },
    numPages: Number,
    isComics: Boolean,
    publishDate: { type: Date, default: Date.now() }
})

export const Book = mongoose.model("books", bookSchema);

export const bookValidator = (_bookToValidate)=>{
    let bookJoi =joi.object({
        name:joi.string().min(2).max(8),
        numPages:joi.number().min(0).max(900)
    })
    return bookJoi.validate(_bookToValidate)
}