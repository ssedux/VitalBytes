import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Configurar multer para almacenamiento temporal
const upload = multer({ dest: "public/" });

const productsController = {};

import Product from "../Models/Products.js";

productsController.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

productsController.insertProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id, state } = req.body;
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image: imageUrl,
      category_id,
      state,
    });

    await newProduct.save();
    res.json({ message: "Product saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
};

productsController.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

productsController.updateProduct = async (req, res) => {
  const { name, description, price, stock, image, category_id, state } = req.body;
  await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, stock, image, category_id, state },
    { new: true }
  );
  res.json({ message: "Product updated" });
};

export { upload };
export default productsController;