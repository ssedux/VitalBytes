import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import Product from "../Models/Products.js";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Configurar multer para almacenamiento temporal
const upload = multer({ dest: "public/" });

const productsController = {};

// Obtener productos
productsController.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Insertar producto con imagen
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

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error guardando producto", error });
  }
};

// Eliminar producto
productsController.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto", error });
  }
};

// Actualizar producto con posible imagen
productsController.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id, state } = req.body;

    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        image: imageUrl,
        category_id,
        state,
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando producto", error });
  }
};

export { upload };
export default productsController;
