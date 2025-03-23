const CategoriasControlador = {};

import CategoriasModel from "../Models/CategoriasModel";

// SELECT
CategoriasControlador.getCategorias = async (req, res) => {
  const categorias = await CategoriasModel.find();
  res.json(categorias);
};

// INSERT
CategoriasControlador.insertCategorias = async (req, res) => {
  const { Nombre } = req.body;
  
  const newCategoria = new CategoriasModel({
    Nombre
  });

  await newCategoria.save();
  res.json({ message: "Categoría agregada correctamente", categoria: newCategoria });
};

// UPDATE
CategoriasControlador.updateCategorias = async (req, res) => {
  const { Nombre } = req.body;

  const updatedCategoria = await CategoriasModel.findByIdAndUpdate(
    req.params.id,
    { Nombre },
    { new: true }
  );

  res.json({ message: "Categoría actualizada correctamente", categoria: updatedCategoria });
};

// DELETE
CategoriasControlador.deleteCategorias = async (req, res) => {
  await CategoriasModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Categoría eliminada correctamente" });
};

export default CategoriasControlador;
