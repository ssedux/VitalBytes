import React from 'react';
import './../style/Client/Catalogo.css';

function Catalogo() {
  const categories = [
    'Galletas',
    'Semillas',
    'Yogurt natural',
    'Hummus y vegetales',
    'Barras de granola',
    'Frutas frescas',
  ];

  const products = [
    { id: 1, name: 'Producto 1', category: 'Semillas', price: 10 },
    { id: 2, name: 'Producto 2', category: 'Yogurt natural', price: 15 },
    { id: 3, name: 'Producto 3', category: 'Galletas', price: 8 },
    { id: 4, name: 'Producto 4', category: 'Galletas', price: 12 },
    { id: 5, name: 'Producto 5', category: 'Semillas', price: 11 },
    { id: 6, name: 'Producto 6', category: 'Yogurt natural', price: 14 },
    { id: 7, name: 'Producto 7', category: 'Frutas frescas', price: 9 },
  ];

  return (
    <div className="catalogo-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categorías</h2>
        <form className="category-list">
          {categories.map((category, index) => (
            <label key={index} className="category-item">
              <span>{category}</span>
              <input type="checkbox" name="categories" value={category} />
            </label>
          ))}
        </form>
      </aside>

      <div className="divider"></div>

      <main className="main-content">
        <div className="products-wrapper">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
            />
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-card ${
                  product.id % 2 === 0 ? 'green-bg' : 'beige-bg'
                }`}
              >
                <div className="image-placeholder"></div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price-label">precio:</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-button">+</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Catalogo;
