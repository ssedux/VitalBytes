/* 
como vamos a validar si es cliente o empleado, 
entonces importo ambos modelos
*/

import ClientsModel from "../Models/ClientModel.js";
import EmployeesModel from "../Models/Employee.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
 
const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let userFound;
        let userType;
        // Admin
        if(email === config.EmailAdmin.user && password === config.EmailAdmin.pass){
            userType = "admin";
            userFound ={_id:"admin"};
        } else {
            // Buscar por email o username en empleados
            userFound = await EmployeesModel.findOne({ $or: [ { email }, { username: email } ] });
            userType = "employee";
            if(!userFound){
                // Buscar por email o username en clientes
                userFound = await ClientsModel.findOne({ $or: [ { email }, { username: email } ] });
                userType = "client";
            }
        }
        if(!userFound){
            return res.status(400).json({message:"User not found"});
        }
        if(userType !== "admin"){
            const matchPassword = await bcryptjs.compare(password, userFound.password);
            if(!matchPassword){
                return res.status(400).json({message:"Invalid password"});
            }
        }
        jwt.sign(
            {id:userFound._id, userType}, 
            config.JWT.secret, 
            {expiresIn:config.JWT.expiresIn}, 
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({message:"User logged in", userType});
            }
        );
    } catch(error){
        console.log(error)
    }
};

export default loginController;