 
import express from "express";
import employeeController from "../Controllers/employeeController";
const router = express.Router();

router.route("/")
.get(employeeController.getEmployees)
.post(employeeController.insertEmployee);

router.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee);

export default router;