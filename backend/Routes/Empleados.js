import express from "express";
import EmpleadosControlador from "../Controllers/EmpleadosControlador";

const router = express.Router();

router
  .route("/")
  .get(EmpleadosControlador.getEmpleados)
  .post(EmpleadosControlador.insertEmpleados);

router
  .route("/:id")
  .put(EmpleadosControlador.updateEmpleados)
  .delete(EmpleadosControlador.deleteEmpleados);

export default router;
