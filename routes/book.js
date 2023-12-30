import express from "express";
import * as bookController from "../controllers/book.js";

const router = express.Router();

router.get("/",bookController.getAllBooks)
router.get("/between",bookController.booksBetween)
router.get("/:id",bookController.getBookById)
router.delete("/:id",bookController.deleteBook)
router.post("/",bookController.addBook)
router.put("/:bookId",bookController.updateBook)

export default router;