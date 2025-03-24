
import express from "express";
import cartRoutes from "./Routes/cart.js";
import clientRoutes from "./Routes/client.js";
import salesRoutes from "./Routes/sales.js";

import productsRoutes from "./Routes/products.js"
import employeeRoutes from "./Routes/employee.js"
import categoryRoutes from "./Routes/category.js"

const app = express();

app.use(express.json());

app.use("/api/products",productsRoutes)
app.use("/api/employee",employeeRoutes)
app.use("/api/category",categoryRoutes)

app.use("/api/cart", cartRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/sales", salesRoutes);

export default app;
