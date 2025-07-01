import Review from "./models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;
    const review = new Review({ userId, bookId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("bookId", "title");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).populate(
      "bookId",
      "title"
    );
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
