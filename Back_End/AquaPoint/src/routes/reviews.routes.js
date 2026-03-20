import { Router } from "express";
import { getAllReviews, getReviewById, getReviewByPointId, getReviewsByUserId, createReview, deleteReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/aquapoint/:id", getReviewByPointId);
router.get("/user/:id", getReviewsByUserId);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;