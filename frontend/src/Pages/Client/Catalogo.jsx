import React, { useEffect, useState } from 'react';
import './../style/Client/Catalogo.css';
import axios from 'axios';
import ProductModal from '../../components/Modales/DetailProducts';

function Catalogo() {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/category')
      .then((res) => {
        console.log('Categorías API:', res.data);
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="catalogo-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categorías</h2>
        <form className="category-list">
          {categories.map((category, index) => {
            const label = category.name || category;
            const key = category._id || category.id || index;
            return (
              <label key={key} className="category-item">
                <span>{label}</span>
                <input type="checkbox" name="categories" value={label} />
              </label>
            );
          })}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`product-card ${
                  product.state === 'Disponible' ? 'green-bg' : 'beige-bg'
                }`}
                onClick={() => handleCardClick(product)}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="image-placeholder"></div>
                )}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price-label">Precio:</p>
                <p className="product-price">${product.price?.toFixed(2)}</p>
                <p className="product-state">
                  {product.state === 'Disponible' ? 'Disponible' : 'No disponible'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
}

export default Catalogo;
