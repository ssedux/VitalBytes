import express from "express";
import CarroControlador from "../Controllers/CarroControlador";

const router = express.Router();

router
  .route("/")
  .get(CarroControlador.getCompra)
  .post(CarroControlador.insertCompra);

router
  .route("/:id")
  .put(CarroControlador.updateCompra)
  .delete(CarroControlador.deleteCompra);

export default router;
