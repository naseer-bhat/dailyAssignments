
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  price: { type: Number, required: true },
  publishedYear: { type: Number },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
