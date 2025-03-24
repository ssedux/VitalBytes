const ProductosControlador = {};

import ProductosModel from "../Models/ProductsModel";

// SELECT
ProductosControlador.getProductos = async (req, res) => {
  const productos = await ProductosModel.find();
  res.json(productos);
};

// INSERT
ProductosControlador.insertProductos = async (req, res) => {
  const { Nombre, Precio } = req.body;
  const newProducto = new ProductosModel({ Nombre, Precio });
  await newProducto.save();
  res.json({ message: "Producto agregado" });
};

// UPDATE
ProductosControlador.updateProductos = async (req, res) => {
  const { Nombre, Precio } = req.body;
  await ProductosModel.findByIdAndUpdate(
    req.params.id,
    {
      Nombre,
      Precio
    },
    { new: true }
  );
};


// DELETE
ProductosControlador.deleteProductos = async (req, res) => {
  await ProductosModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
};


export default ProductosControlador;