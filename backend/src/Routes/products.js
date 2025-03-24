
import express from "express";
import productsController from "../Controllers/productsController.js";
const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProduct);

router.route("/:id")
.put(productsController.updateProduct)
.delete(productsController.deleteProduct);

export default router;