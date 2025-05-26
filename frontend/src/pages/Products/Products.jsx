import React, { useState } from "react";
import { Package, DollarSign, Hash, FileText, CheckCircle, AlertCircle } from "lucide-react";
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
    setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 2000); // 2 segundos
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
    </div>
  );
}

export default Products;