
import { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/book.controller.js";

const router = Router();

router.post("/books", createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
