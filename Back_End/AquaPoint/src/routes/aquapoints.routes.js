import { Router } from "express";
import { getAllAquapoints, getAquaPointById, getUserFavoritePoints, getCountPendingAquapoints, getPendingPoints, createAquapoint, updateAquapoint, changeAquapointState, deleteAquapoint } from "../controllers/aquapoints.controller.js";

const router = Router();

router.get("/", getAllAquapoints);    
router.get("/pending-points", getPendingPoints);    
router.get("/pending-points-count", getCountPendingAquapoints);
router.get("/:id", getAquaPointById);  
router.get("/user/:id/favorites", getUserFavoritePoints);
router.post("/", createAquapoint);
router.put("/:id", updateAquapoint);
router.put("/change-state/:id", changeAquapointState);
router.delete("/:id", deleteAquapoint);

export default router;