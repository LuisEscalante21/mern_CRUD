import express from "express";
import loginController from "../controllers/loginController";

const router = express.Router();

router.route("/").post(loginController);

export default router;