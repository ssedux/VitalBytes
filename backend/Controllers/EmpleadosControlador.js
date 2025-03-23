const EmpleadosControlador = {};

import EmpleadosModel from "../Models/EmpleadosModel";

// SELECT
EmpleadosControlador.getEmpleados = async (req, res) => {
  const empleados = await EmpleadosModel.find();
  res.json(empleados);
};

// INSERT
EmpleadosControlador.insertEmpleados = async (req, res) => {
  const { NombreCompleto, Correo, Usuario, Contrasena, Cargo, FechaNacimiento, LugarResidencia, FechaInicioLaboral } = req.body;
  
  const newEmpleado = new EmpleadosModel({
    NombreCompleto,
    Correo,
    Usuario,
    Contrasena,
    Cargo,
    FechaNacimiento,
    LugarResidencia,
    FechaInicioLaboral
  });

  await newEmpleado.save();
  res.json({ message: "Empleado agregado correctamente", empleado: newEmpleado });
};

// UPDATE
EmpleadosControlador.updateEmpleados = async (req, res) => {
  const { NombreCompleto, Correo, Usuario, Contrasena, Cargo, FechaNacimiento, LugarResidencia, FechaInicioLaboral } = req.body;

  const updatedEmpleado = await EmpleadosModel.findByIdAndUpdate(
    req.params.id,
    { NombreCompleto, Correo, Usuario, Contrasena, Cargo, FechaNacimiento, LugarResidencia, FechaInicioLaboral },
    { new: true }
  );

  res.json({ message: "Empleado actualizado correctamente", empleado: updatedEmpleado });
};

// DELETE
EmpleadosControlador.deleteEmpleados = async (req, res) => {
  await EmpleadosModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Empleado eliminado correctamente" });
};

export default EmpleadosControlador;
