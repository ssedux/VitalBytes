import express from "express";
import ClientController from "../Controllers/clientController.js";

const router = express.Router();

router
  .route("/")
  .get(ClientController.getClient)
  .post(ClientController.insertClient);

router
  .route("/:id")
  .put(ClientController.updateClient)
  .delete(ClientController.deleteClient);

export default router;
