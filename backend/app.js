// Importo todo lo de la libreria de Express
import express from "express";
import cartRoutes from "./Routes/cart.js";
import categoriesRoutes from "./Routes/categories.js";
import clientRoutes from "./Routes/client.js";
import employedRoutes from "./Routes/employed.js";
import productsRoutes from "./Routes/products.js";
import salesRoutes from "./Routes/sales.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/employed", employedRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/sales", salesRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
