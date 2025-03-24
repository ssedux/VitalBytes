import { Schema, model } from "mongoose";

const ProductosSchema = new Schema(
  {
    Nombre: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    Precio: {
        type: Number,
        required: true,
        min: 0,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Productos", ProductosSchema);