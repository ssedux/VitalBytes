import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientModel from "../Models/ClientModel.js";
import employeeModel from "../Models/Employee.js";
import { sendEmail, HTMLRecoveryEmail } from "../Utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;
  try {
    let userFound;
    let userType;
    userFound = await clientModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeeModel.findOne({ email });
      userType = "employee";
    }
    if (!userFound) {
      return res.json({ message: "User not found" });
    }
    const code = Math.floor(10000 + Math.random() * 60000).toString();
    const token = jsonwebtoken.sign(
      { email, code, userType, verfied: false },
      config.JWT.secret,
      { expiresIn: "25m" }
    );
    res.cookie("tokenRecoveryCode", token, { maxAge: 25 * 60 * 1000 });
    await sendEmail(
      email,
      "Password recovery Code",
      `your verification code is ${code}`,
      HTMLRecoveryEmail(code)
    );
    res.json({ message: "Verification code send" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) {
      return res.json({ message: "Invalid code" });
    }
    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verfied: true,
      },
      config.JWT.secret,
      { expiresIn: "25m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 25 * 60 * 1000 });
    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decoded.verfied) {
      return res.json({ message: "Code not verified" });
    }
    let user;
    const { email } = decoded;
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    if (decoded.userType === "client") {
      user = await clientModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (decoded.userType === "employee") {
      user = await employeeModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }
    res.clearCookie("tokenRecoveryCode");
    res.json({ message: "Password updated" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default passwordRecoveryController;
