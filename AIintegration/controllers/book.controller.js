
import Book from '../models/Book.model.js' ; 
export const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
} 
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews'); 
        const avgRating = book.reviews && book.reviews.length > 0
        const numReviews = book.reviews ? book.reviews.length : 0;
    
        const bookWithStats = {
            ...book.toObject(),
            averageRating: avgRating,
            numberOfReviews: numReviews
        };
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(bookWithStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {  
            return res.status(404).json({ message: "Book not found" });
        }   
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
