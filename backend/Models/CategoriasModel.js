import { Schema, model } from "mongoose";

const CategoriasSchema = new Schema(
  {
    Nombre: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Categorias", CategoriasSchema);
