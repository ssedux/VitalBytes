// array de funciones
// del CRUD
const ordersController = {};
import Orders from "../Models/Orders.js";

// Obtener todos los pedidos
ordersController.getOrders = async (req, res) => {
  const orders = await Orders.find().populate("client_id").populate("items.product_id");
  res.json(orders);
};

// Crear un pedido
ordersController.insertOrder = async (req, res) => {
  const { client_id, items, total_price, order_date, state, payment_method, delivery_address } = req.body;
  const newOrder = new Orders({ client_id, items, total_price, order_date, state, payment_method, delivery_address });
  await newOrder.save();
  res.json({ message: "Order saved" });
};

// Eliminar un pedido
ordersController.deleteOrder = async (req, res) => {
  await Orders.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};

// Actualizar un pedido
ordersController.updateOrder = async (req, res) => {
  const { client_id, items, total_price, order_date, state, payment_method, delivery_address } = req.body;
  await Orders.findByIdAndUpdate(
    req.params.id,
    { client_id, items, total_price, order_date, state, payment_method, delivery_address },
    { new: true }
  );
  res.json({ message: "Order updated" });
};

export default ordersController;