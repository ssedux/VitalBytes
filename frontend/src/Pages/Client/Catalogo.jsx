import React, { useEffect, useState } from 'react';
import './../style/Client/Catalogo.css';
import axios from 'axios';
import ProductModal from '../../components/Modales/DetailProducts';
import { useCart } from '../../context/CartContext'; // Ajusta ruta

function Catalogo() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/category')
      .then((res) => {
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

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((cat) => cat !== value);
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

    if (selectedCategories.length === 0) {
      return matchesSearch;
    }

    // El producto puede tener category_id como string o como objeto
    const productCategoryId = product.category_id?._id || product.category_id || product.category?._id || product.category;
    const matchesCategory = selectedCategories.includes(productCategoryId);

    return matchesSearch && matchesCategory;
  });

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
            const value = category._id || category.id || label;
            return (
              <label key={key} className="category-item">
                <span>{label}</span>
                <input
                  type="checkbox"
                  name="categories"
                  value={value}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(value)}
                />
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
            {filteredProducts.map((product) => {
              const inCart = cart.find(p => p._id === product._id);

              return (
                <div
                  key={product._id}
                  className="product-card"
                  onClick={() => handleCardClick(product)}
                >
                  <div className="product-image-container">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="image-placeholder"></div>
                    )}
                  </div>

                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>

                    <div className="product-price-container">
                      <span className="product-price-label">Precio:</span>
                      <span className="product-price">${product.price?.toFixed(2)}</span>
                    </div>

                    <p
                      className={`product-state ${
                        product.state === 'Disponible' ? 'disponible' : 'no-disponible'
                      }`}
                    >
                      {product.state}
                    </p>
                  </div>

                  {inCart ? (
                    <div
                      className="quantity-controls"
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <button
                        onClick={() => updateQuantity(product._id, -1)}
                        disabled={inCart.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{inCart.quantity}</span>
                      <button onClick={() => updateQuantity(product._id, 1)}>+</button>
                    </div>
                  ) : (
                    <button
                      className="add-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
}

export default Catalogo;