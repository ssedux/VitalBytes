/* En este archivo dentro de la carpeta
 routes, vamos a colocar, que metodos
 tiene la ruta "/api/cart"
 */
import express from "express";
import cartController from "../Controllers/cartController.js";

const router = express.Router();

router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.insertCart);

router
  .route("/:id")
  .put(cartController.updateCart)
  .delete(cartController.deleteCart);

export default router;
