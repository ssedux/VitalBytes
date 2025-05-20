const employeeController = {};

import Employee from "../Models/Employee.js"; 


employeeController.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

employeeController.insertEmployee = async (req, res) => {
    const { fullName, email, username, password, birth, phone, role } = req.body;
    
    const newEmployee = new Employee({ fullName, email, username, password, birth, phone, role });

    await newEmployee.save();
    res.json({ message: "Employee saved" });
};

employeeController.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee deleted" });
};

employeeController.updateEmployee = async (req, res) => {
    const { fullName, email, username, password, birth, phone, role } = req.body;

    await Employee.findByIdAndUpdate(
        req.params.id,
        { fullName, email, username, password, birth, phone, role },
        { new: true }
    );
    res.json({ message: "Employee updated" });
};

export default employeeController;