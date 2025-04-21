import React, { useState } from 'react';
import Categorias from '../components/Categorias'; // Importa el componente
import './style/Catalogo.css';

function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto A', category: 'Promociones', price: 10 },
    { id: 2, name: 'Producto B', category: 'Productos Nuevos', price: 20 },
    { id: 3, name: 'Producto C', category: 'Pollo', price: 15 },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Promociones' },
    { id: 2, name: 'Productos Nuevos' },
    { id: 3, name: 'Pollo' },
    { id: 4, name: 'Extras, Bebidas y Postres' },
  ]);

  const handleCategoryClick = (category) => {
    console.log(`Categoría seleccionada: ${category.name}`);
    // Aquí puedes agregar lógica para filtrar productos por categoría
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalogo">
      {/* Sidebar de categorías */}
      <Categorias categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Línea vertical divisoria */}
      <div className="divider"></div>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de productos */}
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;