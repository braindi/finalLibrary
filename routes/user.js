import express from "express";
import * as userController from "../controllers/user.js";
const router = express.Router();

router.post("/", userController.addUser);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);

export default router;
