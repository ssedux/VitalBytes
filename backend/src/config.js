import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Forzar la carga del .env desde la ruta absoluta de backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT,
  },
  JWT:{
    secret:process.env.JWT_SECRET,
    expiresIn:process.env.JWT_EXPIRES,
  },
  EmailAdmin:{
      user:process.env.ADMIN_EMAIL,
      pass:process.env.ADMIN_PASSWORD
  },
  email: {
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
  },
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  }
};
