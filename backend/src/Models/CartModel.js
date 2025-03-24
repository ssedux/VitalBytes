import { Schema, model } from "mongoose";

const PagoSchema = new Schema(
  {
    Total: {
        type: Number,
        required: true,
        min: 0,
    },
    Pago: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Pago", PagoSchema);