import express from "express";
import loginController from "../Controllers/loginController.js";

const router = express.Router();
router.route("/").post(loginController.login);

export default router;