import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"VitalByte" <no-reply@vitalbyte.com>',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.log("Error sending email", error);
  }
};

const HTMLRecoveryEmail = (code) => {
  return `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">Password Recovery</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.5;">
          Hello, we received a request to reset your password. Use the verification code below to proceed:
        </p>
        <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background-color: #ff7f50; border-radius: 5px; border: 1px solid #e67e22;">
          ${code}
        </div>
        <p style="font-size: 14px; color: #777; line-height: 1.5;">
          This code is valid for the next <strong>15 minutes</strong>. If you didn’t request this email, you can safely ignore it.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer style="font-size: 12px; color: #aaa;">
          If you need further assistance, please contact our support team at 
          <a href="mailto:support@vitalbyte.com" style="color: #3498db; text-decoration: none;">support@vitalbyte.com</a>.
        </footer>
      </div>
    `;
};

export { sendEmail, HTMLRecoveryEmail };
