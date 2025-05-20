//importamos el modelo de la base de datos
import Client from "../Models/ClientModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../config.js";
//creamos un array de funciones
const registerClientController = {};

registerClientController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.VerificationToken;
    try {
        const decoded = jwt.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;
        if (verificationCode !== storedCode) {
            return res.status(400).json({ message: "Código inválido" });
        }
        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        client.isVerified = true;
        await client.save();
        res.clearCookie("VerificationToken");
        res.json({ message: "Correo verificado exitosamente" });
    } catch (error) {
        res.status(400).json({ message: "Error al verificar el código" });
    }
};

registerClientController.registerClient=async(req,res)=>{
    let {fullname, email, username, password, birth, phone} = req.body;
    try{
        //veridicamos si el empleado ya existe
        const ClientExist=await Client.findOne({email});
        if(ClientExist){
            return res.status(400).json({message:"El correo ya está registrado. Intenta con otro correo."});
        }
        //Hasheamos la contraseña
        const passwordHash=await bcryptjs.hash(password,10);
        // Convertir birth a Date si es string
        if (typeof birth === 'string') {
            birth = new Date(birth);
        }
        //guardamos el empleado
        const newClient=new Client({fullname, email, username, password:passwordHash, birth, phone});

        await newClient.save();
        // Generar código de verificación
        const verificationCode = crypto.randomBytes(3).toString("hex");
        const tokenCode = jwt.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: "2h" }
        );
        res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });
        // Enviar correo
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificación de correo",
            text: `Para verificar tu correo, utiliza el siguiente código: ${verificationCode}\nEl código vence en dos horas`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar correo:", error);
                return res.status(500).json({ message: "Error al enviar correo" });
            }
            return res.status(200).json({ message: "Usuario registrado correctamente. Por favor verifica tu correo con el código enviado." });
        });
    }
    catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({message:"El correo ya está registrado. Intenta con otro correo."});
        }
        console.log(error);
        res.status(500).json({message:"Error al registrar Usuario"});
    }
}
export default registerClientController;



