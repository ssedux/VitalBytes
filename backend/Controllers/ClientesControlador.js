const ClientesControlador = {};

import ClientesModel from "../Models/ClientesModel";

// SELECT
ClientesControlador.getClientes = async (req, res) => {
  const clientes = await ClientesModel.find();
  res.json(clientes);
};

// INSERT
ClientesControlador.insertClientes = async (req, res) => {
  const { NombreCompleto, Correo, Usuario, Contrasena } = req.body;
  const newCliente = new ClientesModel({
    NombreCompleto,
    Correo,
    Usuario,
    Contrasena
  });

  await newCliente.save();
  res.json({ message: "Cliente agregado correctamente", cliente: newCliente });
};

// UPDATE
ClientesControlador.updateClientes = async (req, res) => {
  const { NombreCompleto, Correo, Usuario, Contrasena } = req.body;

  const updatedCliente = await ClientesModel.findByIdAndUpdate(
    req.params.id,
    { NombreCompleto, Correo, Usuario, Contrasena },
    { new: true }
  );

  res.json({ message: "Cliente actualizado correctamente", cliente: updatedCliente });
};

// DELETE
ClientesControlador.deleteClientes = async (req, res) => {
  await ClientesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Cliente eliminado correctamente" });
};

export default ClientesControlador;
