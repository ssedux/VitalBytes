 
import express from "express";
import employeeController from "../Controllers/employeeController.js";
const router = express.Router();

router.route("/")
.get(employeeController.getEmployees)
.post(employeeController.insertEmployee);

router.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee);

export default router;