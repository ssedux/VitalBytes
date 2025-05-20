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
        //validamos los 3 posibles niveles
        //1.Admin,2.Empleado,3. Cliente
        let userFound;//variable para almacenar el usuario encontrado
        let userType;//variable para almacenar el tipo de usuario

        //1.admin
        //verificamos si el email y password son del admin
        if(email === config.EmailAdmin.user && password === config.EmailAdmin.pass){
            userType = "admin";
            userFound ={_id:"admin"};
        }
        //2.Empleado
        //verificamos si el email y password son de un empleado
        else{
            userFound = await EmployeesModel.findOne({email});
            userType = "employee";

            if(!userFound){
                //3.Cliente
                //verificamos si el email y password son de un cliente
                userFound = await ClientsModel.findOne({email});
                userType = "client";
        }
    }
    if(!userFound){
        return res.status(400).json({message:"User not found"});
    }
    //si no es administrador verificamos la contraseña
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
        });
}
    catch(error){
        console.log(error)
    }
};

export default loginController;