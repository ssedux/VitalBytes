import React, { useEffect, useState } from "react";
import "../style/Admin/Product.css";
import ModalEditarProducto from "../../components/Modales/Products_Admin";
import Swal from "sweetalert2";
import Title from "../../components/Title";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    state: "",
    category_id: "",
    image: ""
  });
  const [previewImage, setPreviewImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al obtener productos:", err));

    fetch("http://localhost:4000/api/category")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:4000/api/products/${id}`, {
          method: "DELETE"
        });
        setProducts(products.filter(prod => prod._id !== id));
        Swal.fire("Eliminado", "El producto fue eliminado.", "success");
      } catch (error) {
        console.error("Error eliminando:", error);
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    }
  };

  const abrirModalEditar = (product) => {
    setFormData({
      ...product,
      category_id: product.category_id?._id || product.category_id || ""
    });
    setPreviewImage(product.image);
    setIsEditMode(true);
    setShowModal(true);
  };

  const abrirModalAgregar = () => {
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      state: "",
      category_id: "",
      image: ""
    });
    setPreviewImage("");
    setIsEditMode(false);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      state: "",
      category_id: "",
      image: ""
    });
    setPreviewImage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const guardarProducto = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("stock", formData.stock);
      form.append("state", formData.state);
      form.append("category_id", formData.category_id);
      // Si la imagen es un File, la subimos, si es string (url existente), la pasamos como string
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      } else if (typeof formData.image === "string" && formData.image) {
        form.append("image", formData.image);
      }

      let res;
      if (isEditMode) {
        res = await fetch(`http://localhost:4000/api/products/${formData._id}`, {
          method: "PUT",
          body: form,
        });
      } else {
        res = await fetch("http://localhost:4000/api/products", {
          method: "POST",
          body: form,
        });
      }

      if (!res.ok) throw new Error("Error guardando producto");
      const updatedOrNew = await res.json();

      if (isEditMode) {
        setProducts(products.map(p => (p._id === updatedOrNew._id ? updatedOrNew : p)));
        Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
      } else {
        setProducts([...products, updatedOrNew]);
        Swal.fire("Agregado", "Producto agregado correctamente", "success");
      }

      cerrarModal();
    } catch (error) {
      console.error("Error guardando:", error);
      Swal.fire("Error", "No se pudo guardar el producto.", "error");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="header-search-container">
        <div className="left-group">
          <Title
          texto="Productos"
          />
        
          <input
            type="text"
            placeholder="🔍 Buscar"
            className="products-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn add" onClick={abrirModalAgregar}>
          Agregar
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product._id}>
            <div className="product-info">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Descripción: {product.description}</p>
                <p>Estado: {product.state}</p>
                <p>Precio: {product.price} $</p>
              </div>
            </div>
            <div className="product-buttons">
              <button
                className="btn edit"
                onClick={() => abrirModalEditar(product)}
              >
                Editar
              </button>
              <button
                className="btn delete"
                onClick={() => eliminarProducto(product._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ModalEditarProducto
        isVisible={showModal}
        onClose={cerrarModal}
        formData={formData}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        previewImage={previewImage}
        guardarProducto={guardarProducto}
        categories={categories}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Products;
