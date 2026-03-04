import { Router } from "express";
import { listUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();

router.get("/", listUsers);       
router.get("/:id", getUserById);   

export default router;