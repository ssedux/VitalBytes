import React, { useEffect, useState } from 'react';
import './../style/Client/Cart.css';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; // Ajusta ruta

function Cart() {
  const [products, setProducts] = useState([]);
  const { cart, updateQuantity, removeFromCart, setCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [address, setAddress] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const loaded = res.data.map(p => ({ ...p, quantity: 1 }));
        setProducts(loaded);
      })
      .catch(err => console.error(err));
    console.log('Cart.jsx cargado, backend productos en puerto 4000');
  }, []);

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handlePurchase = () => {
    const client_id = 'CLIENT_ID_PLACEHOLDER';
    const items = cart.map(p => ({
      product_id: p._id,
      quantity: p.quantity,
      price: p.price
    }));
    const order = {
      client_id,
      items,
      total_price: total,
      state: 'Pendiente',
      payment_method: paymentMethod,
      delivery_address: address + (referencePoint ? (', Ref: ' + referencePoint) : '')
    };

    axios.post('http://localhost:3000/api/orders', order)
      .then(() => {
        alert('¡Pedido realizado exitosamente!');
        setCart([]); 
      })
      .catch(err => {
        alert('Error al realizar el pedido');
        console.error(err);
      });
  };

  return (
    <div className="cart-container">
      <div className="cart-products">
        <h1>Carrito de Compras</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Tu carrito está vacío.
                </td>
              </tr>
            ) : (
              cart.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>
                    <button onClick={() => updateQuantity(p._id, -1)} disabled={p.quantity <= 1}>-</button>
                    {p.quantity}
                    <button onClick={() => updateQuantity(p._id, 1)}>+</button>
                  </td>
                  <td>{}</td>
                  <td>${(p.price * p.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(p._id)}>❌</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
      </div>
      <div className="order-summary">
        <h2>Pedido</h2>

        <label>Método de pago:</label>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Paypal">Paypal</option>
          <option value="Transferencia">Transferencia bancaria</option>
        </select>

        <label>Dirección de envío:</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Dirección"
        />

        <label>Punto de referencia:</label>
        <input 
          type="text"
          value={referencePoint}
          onChange={e => setReferencePoint(e.target.value)}
          placeholder="Referencia"
        />

        <label>Teléfono:</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="0000-0000"
        />

        <button className="buy-button" onClick={handlePurchase}>Comprar</button>
      </div>
    </div>
  );
}

export default Cart;