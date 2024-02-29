import { Router } from 'express';

import { createUser, deleteUserById, getAllUser, getUserById, updateUser } from '../Controller/UserController.js';

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);
export default router;