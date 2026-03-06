import { Router } from "express";
import { getAllAquapoints, getAquaPointById, createAquapoint, updateAquapoint, changeAquapointState, deleteAquapoint } from "../controllers/aquapoints.controller.js";

const router = Router();

router.get("/", getAllAquapoints);       
router.get("/:id", getAquaPointById);  
router.post("/", createAquapoint);
router.put("/:id", updateAquapoint);
router.put("/change-state/:id", changeAquapointState);
router.delete("/:id", deleteAquapoint);

export default router;