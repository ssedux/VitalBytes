/*campos:
-idClient
-idProduct
-total
-paymentMethod
-direction
-status
 */

import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  } 

},
  {
    timestamps: true,
    strict: false,
  }
);

export default model("cart", CartSchema);