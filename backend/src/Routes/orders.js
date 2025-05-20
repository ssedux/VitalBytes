/* En este archivo dentro de la carpeta
 routes, vamos a colocar, que metodos
 tiene la ruta "/api/cart"
 */
import express from "express";
import ordersController from "../Controllers/ordersController.js";

const router = express.Router();

router
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.insertOrder);

router
  .route("/:id")
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

export default router;
