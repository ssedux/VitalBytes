/*campos:
-order_id
-client_id
-employee_id
-items
-total_price
-sale_date
-payment_method
-delivery_address
*/
import { Schema, model } from "mongoose";

const salesHistorySchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: "Orders",
            required: true,
        },
        client_id: {
            type: Schema.Types.ObjectId,
            ref: "Clients",
            required: true,
        },
        employee_id: {
            type: Schema.Types.ObjectId,
            ref: "Employees",
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
        sale_date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        payment_method: {
            type: String,
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

export default model("sales", salesHistorySchema);