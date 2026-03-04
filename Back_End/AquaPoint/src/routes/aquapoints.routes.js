import { Router } from "express";
import { listAquaPoints, getAquaPointById } from "../controllers/aquapoints.controller.js";

const router = Router();

router.get("/", listAquaPoints);       
router.get("/:id", getAquaPointById);   

export default router;