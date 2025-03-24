import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        minLength : 4
    },
    idCategory: {
        type: Schema.Types.ObjectId, 
        ref: "Categories",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.1
    },
    available: {
        type: Number,
        required: true,
        default: 0, 
    },
    description: {
        type: String,
        required: true,
        maxLength: 500, 
    },
}, {
    timestamps: true,
    strict: false
});

export default model("product", productSchema);