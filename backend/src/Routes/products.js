import express from "express";
import productsController, { upload } from "../Controllers/productsController.js";

const router = express.Router();

router.route("/")
  .get(productsController.getProducts)
  .post(upload.single("image"), productsController.insertProduct);

router.route("/:id")
  .put(upload.single("image"), productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
