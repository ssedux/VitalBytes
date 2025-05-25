import React from "react";
import "../Modales/Styles/Products_Admin.css";

const ModalEditarProducto = ({
  isVisible,
  onClose,
  formData,
  handleChange,
  handleImageUpload,
  previewImage,
  actualizarProducto,
  categories
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h3>Editar Producto</h3>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Estado"
        />

        {}
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {previewImage && (
          <img src={previewImage} className="preview-image" alt="preview" />
        )}

        <div className="modal-buttons">
          <button className="btn edit" onClick={actualizarProducto}>
            Actualizar
          </button>
          <button className="btn delete" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarProducto;