import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js"
 
export const validateAuthToken = (aLLowedUserTypes =[]) =>{
 
    return (req, res, next) => {
 
    try {
        //1-Validar si existen las cookies
        if(!req.cookies){
            return res.json ({message: "No cookies found, authorization required"})
        }
 
        //2- Si tiene cookie, extraemos el token de las cookies
        const {authToken} = req.cookies;
 
        //3-Extraemos toda la información que tiene el token
        const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)
 
        //Almacenar los datos del usuario en un request
        req.user = decoded
        if (!aLLowedUserTypes.includes(decoded.userType)){
            return res.json ({message:"Access denied"})
        }
        //si si esta, podemos continuiar
    next()
    }catch(error){
 
    }
    }
 
 
}
 