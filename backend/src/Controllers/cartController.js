// array de funciones
// del CRUD
const cartController = {};
import cartModel from "../Models/CartModel.js";

//select
cartController.getCart = async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
}

//insert
cartController.insertCart = async (req, res) => {
  const { idClient,idProduct,total,paymentMethod,direction,status } = req.body;
  const newCart = new cartModel({ idClient,idProduct,total,paymentMethod,direction,status });
  await newCart.save();
  res.json({ message: "cart saved" });
}

//delete
cartController.deleteCart = async (req, res) => {
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "cart deleted" });
}

//update
cartController.updateCart = async (req, res) => {
  const { idClient,idProduct,total,paymentMethod,direction,status } = req.body;
  await cartModel.findByIdAndUpdate(req.params.id, { idClient,idProduct,total,paymentMethod,direction,status },{new:true});
  res.json({ message: "cart updated" });
}

export default cartController; // exportar para poder usar en otro archivo