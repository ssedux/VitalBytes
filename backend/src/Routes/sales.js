/* En este archivo dentro de la carpeta
 routes, vamos a colocar, que metodos
 tiene la ruta "/api/sales"
 */
import express from "express";
import salesController from "../Controllers/salesController.js";

const router = express.Router();

router
  .route("/")
  .get(salesController.getsales)
  .post(salesController.insertsales);

router
  .route("/:id")
  .put(salesController.updatesales)
  .delete(salesController.deletesales);

export default router;
