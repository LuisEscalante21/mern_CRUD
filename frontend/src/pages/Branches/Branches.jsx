import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Edit, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import "./Branches.css";

function Branches() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    telephone: "",
    schedule: "",
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/branches");
      if (res.ok) {
        const data = await res.json();
        setBranches(data);
      } else {
        console.error("Error al obtener sucursales");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.telephone || !form.schedule) {
      Swal.fire("Error", "Por favor, completa los campos obligatorios.", "error");
      return;
    }

    try {
      if (editingBranch) {
        const res = await fetch(`http://localhost:4000/api/branches/${editingBranch.id || editingBranch._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          Swal.fire("Éxito", "Sucursal actualizada correctamente.", "success");
          setEditingBranch(null);
          setForm({ name: "", address: "", telephone: "", schedule: "" });
          fetchBranches();
        } else {
          Swal.fire("Error", "Error al actualizar la sucursal.", "error");
        }
      } else {
        const res = await fetch("http://localhost:4000/api/branches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          Swal.fire("Éxito", "Sucursal agregada correctamente.", "success");
          setForm({ name: "", address: "", telephone: "", schedule: "" });
          fetchBranches();
        } else {
          Swal.fire("Error", "Error al agregar la sucursal.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Error de conexión con el servidor.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:4000/api/branches/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBranches((prevBranches) =>
            prevBranches.filter((branch) => branch.id !== id && branch._id !== id)
          );
          Swal.fire("Eliminado", "La sucursal ha sido eliminada correctamente.", "success");
        } else {
          Swal.fire("Error", "Error al eliminar la sucursal.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Error de conexión con el servidor.", "error");
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setForm(branch);
  };

  return (
    <div className="branches-container">
      <div className="branches-main-wrapper">
        <div className="branches-wrapper">
          <div className="branches-header">
            <div className="branches-icon-container">
              <MapPin className="branches-icon" />
            </div>
            <h1 className="branches-title">{editingBranch ? "Editar Sucursal" : "Agregar Sucursal"}</h1>
            <p className="branches-subtitle">
              {editingBranch
                ? "Modifica la información de la sucursal seleccionada"
                : "Completa la información de la nueva sucursal"}
            </p>
          </div>

          <form className="branches-form" onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="form-group">
                <label className="form-label">
                  <MapPin className="label-icon blue" />
                  Nombre
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Sucursal Centro"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin className="label-icon green" />
                  Dirección
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  maxLength={100}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Ej: Calle Principal #123"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone className="label-icon orange" />
                  Teléfono
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={form.telephone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 4) {
                      value = value.slice(0, 4) + "-" + value.slice(4, 8);
                    }
                    if (value.length > 9) {
                      value = value.slice(0, 9);
                    }
                    setForm({ ...form, telephone: value });
                  }}
                  placeholder="Ej: 1234-5678"
                  className="form-input"
                  maxLength={9}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock className="label-icon purple" />
                  Horario
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={form.schedule}
                  onChange={handleChange}
                  placeholder="Ej: Lunes a Viernes 8:00 AM - 5:00 PM"
                  className="form-input"
                  required
                />
              </div>

              <div className="submit-section">
                <button type="submit" className="submit-button">
                  {editingBranch ? "Actualizar Sucursal" : "Agregar Sucursal"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="branches-list-wrapper">
          <div className="branches-list-header">
            <div className="branches-list-icon-container">
              <Eye className="branches-list-icon" />
            </div>
            <h2 className="branches-list-title">Sucursales Registradas</h2>
            <p className="branches-list-subtitle">
              {branches.length} sucursal{branches.length !== 1 ? "es" : ""} encontrada
              {branches.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="branches-list-container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando sucursales...</p>
              </div>
            ) : branches.length === 0 ? (
              <div className="empty-state">
                <MapPin className="empty-icon" />
                <h3 className="empty-title">No hay sucursales registradas</h3>
                <p className="empty-subtitle">Las sucursales que agregues aparecerán aquí</p>
              </div>
            ) : (
              <div className="branches-grid">
                {branches.map((branch) => (
                  <div key={branch.id || branch._id} className="branch-card">
                    <div className="branch-header">
                      <h3 className="branch-name">{branch.name}</h3>
                      <div className="branch-actions">
                        <button onClick={() => handleEdit(branch)}>
                          <Edit className="action-icon" />
                        </button>
                        <button onClick={() => handleDelete(branch.id || branch._id)}>
                          <Trash2 className="action-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="branch-details">
                      <p className="branch-address">
                        <MapPin className="detail-icon" /> {branch.address}
                      </p>
                      <p className="branch-telephone">
                        <Phone className="detail-icon" /> {branch.telephone}
                      </p>
                      <p className="branch-schedule">
                        <Clock className="detail-icon" /> {branch.schedule}
                      </p>
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

export default Branches;