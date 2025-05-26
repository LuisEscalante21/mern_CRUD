import React, { useState, useEffect } from "react";
import { Package, DollarSign, Hash, FileText, CheckCircle, AlertCircle, Eye, Edit, Trash2} from "lucide-react";
import "./Products.css";

function Products() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id && product._id !== id)
        );
        setMessage("Producto eliminado correctamente.");
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 2000);
      } else {
        setMessage("Error al eliminar el producto.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.");
      setMessageType("error");
    }
  };
    
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Error al obtener productos");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.price === "" || form.stock === "") {
      setMessage("Por favor, completa los campos obligatorios.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      if (res.ok) {
        setMessage("Producto agregado correctamente.");
        setMessageType("success");
        setForm({ name: "", description: "", price: "", stock: "" });
        // Recargar la lista de productos después de agregar uno nuevo
        fetchProducts();
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 2000);
      } else {
        setMessage("Error al agregar el producto.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.");
      setMessageType("error");
    }
  };

  return (
    <div className="products-container">
      <div className="products-main-wrapper">
        {/* Sección del Formulario */}
        <div className="products-wrapper">
          {/* Header */}
          <div className="products-header">
            <div className="products-icon-container">
              <Package className="products-icon" />
            </div>
            <h1 className="products-title">Agregar Producto</h1>
            <p className="products-subtitle">Completa la información del nuevo producto</p>
          </div>

          {/* Form Card */}
          <form className="products-form" onSubmit={handleSubmit}>
            <div className="form-content">
              {/* Nombre */}
              <div className="form-group">
                <label className="form-label">
                  <Package className="label-icon blue" />
                  Nombre del Producto
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: iPhone 15 Pro Max"
                  className="form-input"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="form-group">
                <label className="form-label">
                  <FileText className="label-icon green" />
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe las características principales del producto..."
                  rows="4"
                  className="form-textarea"
                />
              </div>

              {/* Precio y Stock en fila */}
              <div className="form-grid">
                {/* Precio */}
                <div className="form-group">
                  <label className="form-label">
                    <DollarSign className="label-icon emerald" />
                    Precio
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="price-container">
                    <span className="price-prefix">$</span>
                    <input
                      type="number"
                      name="price"
                      min={0}
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="form-input price-input"
                      required
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="form-group">
                  <label className="form-label">
                    <Hash className="label-icon orange" />
                    Stock
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    min={0}
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Cantidad disponible"
                    className="form-input stock-input"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button type="submit" className="submit-button">
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`message ${messageType}`}>
                {messageType === "success" ? (
                  <CheckCircle className="message-icon" />
                ) : (
                  <AlertCircle className="message-icon" />
                )}
                <p className="message-text">{message}</p>
              </div>
            )}
          </form>

          {/* Footer Info */}
          <div className="products-footer">
            Los campos marcados con <span className="footer-asterisk">*</span> son obligatorios
          </div>
        </div>

        {/* Sección de Lista de Productos */}
        <div className="products-list-wrapper">
          <div className="products-list-header">
            <div className="products-list-icon-container">
              <Eye className="products-list-icon" />
            </div>
            <h2 className="products-list-title">Productos Registrados</h2>
            <p className="products-list-subtitle">
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="products-list-container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <Package className="empty-icon" />
                <h3 className="empty-title">No hay productos registrados</h3>
                <p className="empty-subtitle">Los productos que agregues aparecerán aquí</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                <div key={product.id || product._id} className="product-card">
                  <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-actions">
                      <button>
                        <Edit className="action-icon" />
                      </button>
                      <button onClick={() => handleDelete(product.id || product._id)}>
                        <Trash2 className="action-icon" />
                      </button>
                    </div>
                  </div>
                    
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}
                    
                    <div className="product-details">
                      <div className="product-price">
                        <span className="detail-value">${Number(product.price).toFixed(2)}</span>
                      </div>
                      <div className="product-stock">
                        <Hash className="detail-icon" />
                        <span className="detail-value">{product.stock} unidades</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;