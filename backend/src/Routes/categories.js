import express from "express";
import CategoriasControlador from "../Controllers/CategoriasControlador";

const router = express.Router();

router
  .route("/")
  .get(CategoriasControlador.getCategorias)
  .post(CategoriasControlador.insertCategorias);

router
  .route("/:id")
  .put(CategoriasControlador.updateCategorias)
  .delete(CategoriasControlador.deleteCategorias);

export default router;
