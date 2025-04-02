// array de funciones
// del CRUD
const salesController = {};
import salesModel from "../Models/SalesModel.js";

//select
salesController.getsales = async (req, res) => {
  const sales = await salesModel.find();
  res.json(sales);
}

//insert
salesController.insertsales = async (req, res) => {
  const { idclient,idProduct,total,paymentMethod,direction,status } = req.body;
  const newsales = new salesModel({ iduser,idProduct,total,paymentMethod,direction,status });
  await newsales.save();
  res.json({ message: "sales saved" });
}