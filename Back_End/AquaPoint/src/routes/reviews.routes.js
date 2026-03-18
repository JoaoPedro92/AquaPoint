import { Router } from "express";
<<<<<<< HEAD
import { getAllReviews, getReviewById,  getReviewsByUserId, getReviewsByPointId,createReview, updateReview, deleteReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", getAllReviews)
router.get("/:id", getReviewById)
router.get("/user/:id",getReviewsByUserId)
router.get("/aquapoint/:id",getReviewsByPointId)

router.post("/", createReview)
router.put("/:id",updateReview)
router.delete("/:id",deleteReview)
=======
import { getAllReviews, getReviewById, getReviewByPointId, createReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/aquapoint/:id", getReviewByPointId);
router.post("/", createReview);
>>>>>>> main

export default router;