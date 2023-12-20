import { Book } from "../models/book";
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
    try {
        let allBooks = await Book.find({})
        res.json(allBooks)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את הספרים" + err.message)
    }
}

export const getBookById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("קוד לא תקין")
        let book = await Book.findById(req.params.id)
        if (!book)
            return res.status(404).send("לא קיים ספר עם כזה קוד")
        res.json(book)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את הספר" + err.message)
    }
}

export const deleteBook = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("קוד לא תקין")
    let deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook)
        return res.status(404).send("לא קיים ספר עם כזה קוד");
    return res.json(deletedBook);
}

export const updateBook = async (req, res) => {
    let { bookId } = req.params;
    if (!mongoose.isValidObjectId(bookId))
        return res.status(400).send("קוד לא תקין");
    try {
        let bookToUpdate = await Book.findById(bookId)
        if (!bookToUpdate)
            return res.status(404).send("לא קיים ספר עם כזה קוד")
        bookToUpdate.name = req.body.name || bookToUpdate.name;
        bookToUpdate.numPages = req.body.numPages || bookToUpdate.nanumPagesme;
        bookToUpdate.isComics = req.body.isComics || bookToUpdate.isComics;
        bookToUpdate.publishDate = req.body.publishDate || bookToUpdate.publishDate;
        await bookToUpdate.save();
        res.json(bookToUpdate);
    }
    catch (err) {
        res.status(400).send("אי אפשר לעדכן" + err)
    }
}

export const addBook = async (req, res) => {
    let { name, numPages, isComics, publishDate } = req.body;
    if (!name || !numPages)
        return res.status(404).send("לא נשלח שם או מספר עמודים")
    try {
        let sameBook = await Book.find({ numPages, name });
        if (sameBook.length > 0)
            return res.status(409).send("כבר קיים ספר עם כאלו נתונים")
        let newBook = Book.create({ name, numPages, isComics: isComics || false, publishDate })
        await newBook.save();
        return res.status(201).json(newBook)
    }
    catch (err){
        res.status(400).send("אי אפשר להוסיף ספר זה"+err.message)
    }
}