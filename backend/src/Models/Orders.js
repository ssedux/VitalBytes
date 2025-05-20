/*campos:
-client_id
-items (con product_id, quantity, price)
-total_price
-order_date
-state
-payment_method
-delivery_address
 */

import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    state: {
      type: String,
      enum: ["Pendiente", "Finalizado", "Cancelado"],
      default: "Pendiente",
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["Efectivo", "Tarjeta", "Transferencia"],
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Orders", orderSchema);