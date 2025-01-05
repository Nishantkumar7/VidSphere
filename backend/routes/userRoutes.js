import express from "express";
import { getAllUsers, signUp, logIn, getsingleUser } from "../controllers/userController.js"

// added router for video routes

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getsingleUser);

router.post("/signup", signUp);

router.post("/login", logIn);


export default router;