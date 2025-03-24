import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birth: {
        type: string,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
}, {
    timestamps: true, 
    strict: false
});

export default model("Employee", employeeSchema);