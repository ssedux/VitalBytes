import express from "express";
import ClientesControlador from "../Controllers/ClientesControlador";

const router = express.Router();

router
  .route("/")
  .get(ClientesControlador.getClientes)
  .post(ClientesControlador.insertClientes);

router
  .route("/:id")
  .put(ClientesControlador.updateClientes)
  .delete(ClientesControlador.deleteClientes);

export default router;
