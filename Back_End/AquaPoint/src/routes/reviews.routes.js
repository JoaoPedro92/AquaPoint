import { Router } from "express";
import { getAllReviews, getReviewById, getReviewByPointId, createReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/aquapoint/:id", getReviewByPointId);
router.post("/", createReview);

export default router;