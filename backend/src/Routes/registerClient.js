import express from "express";
import registerClientController from "../controllers/registerClientController.js";

const router = express.Router();

router.route("/").post(registerClientController.registerClient);
router.route("/verifyCodeEmail").post(registerClientController.verifyCodeEmail);

export default router;