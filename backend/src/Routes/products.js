import express from "express";
import ProductosControlador from "../Controllers/ProductosControlador";

const router = express.Router();

router
  .route("/")
  .get(ProductosControlador.getProductos)
  .post(ProductosControlador.insertProductos);

router
  .route("/:id")
  .put(ProductosControlador.updateProductos)
  .delete(ProductosControlador.deleteProductos);

export default router;
