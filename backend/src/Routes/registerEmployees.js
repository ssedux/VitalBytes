import express from "express";
import registerEmployeesController from "../Controllers/registerEmployees.js";
const router = express.Router();

router.route("/").post(registerEmployeesController.registerEmployee);

export default router;
