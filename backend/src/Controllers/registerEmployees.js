import Employee from "../Models/Employee.js";
import bcryptjs from "bcryptjs";

const registerEmployeesController = {};

registerEmployeesController.registerEmployee = async (req, res) => {
    let { fullName, email, username, password, birth, phone, role, direction } = req.body;
    try {
        const employeeExist = await Employee.findOne({ email });
        if (employeeExist) {
            return res.status(400).json({ message: "El correo ya está registrado. Intenta con otro correo." });
        }
        const passwordHash = await bcryptjs.hash(password, 10);
        const newEmployee = new Employee({
            fullName,
            email,
            username,
            password: passwordHash,
            birth,
            phone,
            role,
            direction
        });
        await newEmployee.save();
        res.status(200).json({ message: "Empleado registrado correctamente" });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: "El correo ya está registrado. Intenta con otro correo." });
        }
        console.log(error);
        res.status(500).json({ message: "Error al registrar empleado" });
    }
};

export default registerEmployeesController;
