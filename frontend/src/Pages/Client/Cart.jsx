import React, { useEffect, useState } from 'react';
import './../style/Client/Cart.css';
import axios from 'axios';

function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(p =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handlePurchase = () => {
    // TODO: Obtener el client_id real del usuario autenticado
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
      // order_date lo pone el backend por defecto
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
            {cart.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>
                  <button onClick={() => updateQuantity(p._id, -1)}>-</button>
                  {p.quantity}
                  <button onClick={() => updateQuantity(p._id, 1)}>+</button>
                </td>
                <td>${p.price.toFixed(2)}</td>
                <td>${(p.price * p.quantity).toFixed(2)}</td>
                <td><button onClick={() => removeFromCart(p._id)}>❌</button></td>
              </tr>
            ))}
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
