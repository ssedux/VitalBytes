import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength : 50
    },
    username: {
        type: String,
        required: true,
        unique: true
        ,maxLength : 20
    },
    password: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxLength: 8,
        minLength: 8
    },
    role: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
}, {
    timestamps: true, 
    strict: false
});

export default model("Employees", employeeSchema);