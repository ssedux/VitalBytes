import express from "express";
import VentasControlador from "../Controllers/VentasControlador";

const router = express.Router();

router
  .route("/")
  .get(VentasControlador.getVentas)
  .post(VentasControlador.insertVentas);

router
  .route("/:id")
  .put(VentasControlador.updateVentas)
  .delete(VentasControlador.deleteVentas);

export default router;
