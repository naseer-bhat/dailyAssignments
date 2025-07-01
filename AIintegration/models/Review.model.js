// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
