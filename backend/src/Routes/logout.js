import express from "express";
const router = express.Router();

import logoutController from "../Controllers/logoutController.js";

router.route("/").get(logoutController.logout);

export default router;