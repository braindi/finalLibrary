import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{type:String,require:true},
    numPages:Number,
    isComics:Boolean,
    publishDate:{type:Date, default:Date.now()}
})

export const Book = mongoose.model("books",bookSchema )