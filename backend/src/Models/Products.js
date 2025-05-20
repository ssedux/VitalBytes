import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 4
    },
    description: {
        type: String,
        required: true,
        maxLength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0.1
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    state: {
        type: String,
        enum: ["Disponible", "Agotado"],
        default: "Disponible",
        required: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Products", productSchema);