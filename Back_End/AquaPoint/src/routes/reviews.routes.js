import { Router } from "express";
import { getAllReviews, getReviewById,  getReviewsByUserId, getReviewsByPointId,createReview, updateReview, deleteReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", getAllReviews)
router.get("/:id", getReviewById)
router.get("/user/:id",getReviewsByUserId)
router.get("/aquapoint/:id",getReviewsByPointId)

router.post("/", createReview)
router.put("/:id",updateReview)
router.delete("/:id",deleteReview)

export default router;