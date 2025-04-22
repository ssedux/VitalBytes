import React from 'react';
import './style/Categorias.css'; // Asegúrate de crear este archivo para los estilos

function Categorias({ categories, onCategoryClick }) {
  return (
    <div className="sidebar">
      <h2>Categorías</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className="category-item"
            onClick={() => onCategoryClick(category)}
          >
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;