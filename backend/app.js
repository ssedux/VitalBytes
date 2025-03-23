// Importo todo lo de la libreria de Express
import express from "express";
import Carro_ComprasRoutes from "./Routes/Carro_Compras.js";
import CategoriasRoutes from "./Routes/Categorias.js";
import ClientesRoutes from "./Routes/Clientes.js";
import EmpleadosRoutes from "./Routes/Empleados.js";
import ProductosRoutes from "./Routes/Productos.js";
import VentasRoutes from "./Routes/Ventas.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/Carro_Compras", Carro_ComprasRoutes);
app.use("/api/Categorias", CategoriasRoutes);
app.use("/api/Clientes", ClientesRoutes);
app.use("/api/Empleados", EmpleadosRoutes);
app.use("/api/Productos", ProductosRoutes);
app.use("/api/Ventas", VentasRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
