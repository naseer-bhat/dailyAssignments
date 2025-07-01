import { Router } from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByUser,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = Router();
router.post("/reviews", createReview);
router.get("/reviews", getAllReviews);
router.get("/reviews/user/:userId", getReviewsByUser);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;
