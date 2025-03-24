import { Schema, model } from "mongoose";

const EmpleadosSchema = new Schema(
  {
    NombreCompleto: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    Correo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
      validate: {
        validator: function(v) {
          return /@/.test(v); 
        },
        message: props => `${props.value} no es un correo válido. Debe contener '@'.`
      }
    },
    Usuario: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,

    },
    Contrasena:{
        type: String,
        required: true,
        minlength: 8,
    },
    Cargo: {
        type: String,
        required: true,
    },
    FechaNacimiento: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    LugarResidencia:{
        type: String,
        required: true
    },
    FechaInicioLaboral: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Empleados", EmpleadosSchema);
