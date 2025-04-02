//importamos el modelo de la base de datos
import Client from "../models/ClientModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
//creamos un array de funciones
const registerClientController = {};

registerClientController.registerClient=async(req,res)=>{
    const{fullname, email, username, password,birth,number}=req.body;
    
    try{
        //veridicamos si el empleado ya existe
        const ClientExist=await Client.findOne({email});
        if(ClientExist){
            return res.status(400).json({message:"este usurio ya existe"});
        }
        //Hasheamos la contraseña
        const passwordHash=await bcryptjs.hash(password,10);

        //guardamos el empleado
        const newClient=new Client({fullname, email, username, password:passwordHash,birth,number});

        await newClient.save();
        //creamos el token
        jwt.sign({id:newClient._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error,token)=>{
                if(error) console.log(error);
                res.cookie("authToken",token);
            }
    );  

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error al registrar Usuario"});
    }
}
export default registerClientController;



