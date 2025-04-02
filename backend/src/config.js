import dotenv from "dotenv";

// Ejecutamos la libreria
// para acceder al .env
dotenv.config();

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
  }
};
    