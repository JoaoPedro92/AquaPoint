import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, changeIsAdmin, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);       
router.get("/:id", getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id/change-isadmin', changeIsAdmin);
router.delete('/:id', deleteUser);

export default router;