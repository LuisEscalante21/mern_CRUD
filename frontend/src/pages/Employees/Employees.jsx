import React, { useState, useEffect } from "react";
import { User,  Mail, Phone, Edit, Trash2, Key, Eye } from "lucide-react";
import Swal from "sweetalert2";
import "./Employees.css";

function Employees() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    telephone: "",
    dui: "",
    isVerified: false,
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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
        const response = await fetch(`http://localhost:4000/api/employees/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id && employee._id !== id)
          );
          Swal.fire("Eliminado", "El empleado ha sido eliminado correctamente.", "success");
        } else {
          Swal.fire("Error", "Error al eliminar el empleado.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Error de conexión con el servidor.", "error");
    }
  };

  const fetchEmployees = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:4000/api/employees");
    if (res.ok) {
      const data = await res.json();
      console.log("Empleados obtenidos:", data); // Verifica que `name` y `lastname` estén presentes
      setEmployees(data);
    } else {
      console.error("Error al obtener empleados");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.lastName || !form.email || !form.telephone) {
      Swal.fire("Error", "Por favor, completa los campos obligatorios.", "error");
      return;
    }

    try {
      if (editingEmployee) {
        // Modo edición: actualizar empleado
        const res = await fetch(`http://localhost:4000/api/employees/${editingEmployee.id || editingEmployee._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          Swal.fire("Éxito", "Empleado actualizado correctamente.", "success");
          setEditingEmployee(null);
          setForm({
            name: "",
            lastName: "",
            email: "",
            telephone: "",
            dui: "",
            isVerified: false,
          });
          fetchEmployees();
        } else {
          Swal.fire("Error", "Error al actualizar el empleado.", "error");
        }
      } else {
        // Modo agregar: agregar empleado
        const res = await fetch("http://localhost:4000/api/registerEmployees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          Swal.fire("Éxito", "Empleado agregado correctamente.", "success");
          setForm({
            name: "",
            lastName: "",
            email: "",
            telephone: "",
            dui: "",
            isVerified: false,
          });
          fetchEmployees();
        } else {
          Swal.fire("Error", "Error al agregar el empleado.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Error de conexión con el servidor.", "error");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setForm(employee);
  };

  return (
    <div className="employees-container">
      <div className="employees-main-wrapper">
        {/* Formulario */}
        <div className="employees-wrapper">
          <div className="employees-header">
            <div className="employees-icon-container">
              <User className="employees-icon" />
            </div>
            <h1 className="employees-title">{editingEmployee ? "Editar Empleado" : "Agregar Empleado"}</h1>
            <p className="employees-subtitle">
              {editingEmployee
                ? "Modifica la información del empleado seleccionado"
                : "Completa la información del nuevo empleado"}
            </p>
          </div>

          <form className="employees-form" onSubmit={handleSubmit}>
            <div className="form-content">
              {/* Nombre */}
              <div className="form-group">
                <label className="form-label">
                  <User className="label-icon blue" />
                  Nombre
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Juan"
                  className="form-input"
                  required
                />
              </div>

              {/* Apellido */}
              <div className="form-group">
                <label className="form-label">
                  <User className="label-icon green" />
                  Apellido
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  maxLength={100}
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Ej: Pérez"
                  className="form-input"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <Mail className="label-icon orange" />
                  Email
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  maxLength={100}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ej: juan.perez@example.com"
                  className="form-input"
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="form-group">
                <label className="form-label">
                  <Key className="label-icon red" />
                  Contraseña
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  maxLength={100}
                  value={form.password || ""}
                  onChange={handleChange}
                  placeholder="Ej: ********"
                  className="form-input"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label className="form-label">
                  <Phone className="label-icon purple" />
                  Teléfono
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={form.telephone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                    if (value.length > 4) {
                      value = value.slice(0, 4) + "-" + value.slice(4, 8); // Inserta el guion después de los primeros 4 números
                    }
                    if (value.length > 9) {
                      value = value.slice(0, 9); // Limita el total a 9 caracteres (incluyendo el guion)
                    }
                    setForm({ ...form, telephone: value }); // Actualiza el estado
                  }}
                  placeholder="Ej: 1234-5678"
                  className="form-input"
                  maxLength={9} // Limita el input a 9 caracteres
                  required
                />
              </div>

              {/* DUI */}
              <div className="form-group">
                <label className="form-label">
                  <User className="label-icon teal" />
                  DUI
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="dui"
                  value={form.dui}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                    if (value.length > 7) {
                      value = value.slice(0, 8) + "-" + value.slice(8, 9); // Inserta el guion después de los primeros 7 números
                    }
                    if (value.length > 9) {
                      value = value.slice(0, 10); // Limita el total a 9 caracteres (incluyendo el guion)
                    }
                    setForm({ ...form, dui: value }); // Actualiza el estado
                  }}
                  placeholder="Ej: 01234567-8"
                  className="form-input"
                  maxLength={10} // Limita el input a 9 caracteres
                  required
                />
              </div>

              {/* Botón de envío */}
              <div className="submit-section">
                <button type="submit" className="submit-button">
                  {editingEmployee ? "Actualizar Empleado" : "Agregar Empleado"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Lista de empleados */}
        <div className="employees-list-wrapper">
          <div className="employees-list-header">
          <div className="employees-list-icon-container">
              <Eye className="employees-list-icon" />
            </div>
            <h2 className="employees-list-title">Empleados Registrados</h2>
            <p className="employees-list-subtitle">
              {employees.length} empleado{employees.length !== 1 ? "s" : ""} encontrado
              {employees.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="employees-list-container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando empleados...</p>
              </div>
            ) : employees.length === 0 ? (
              <div className="empty-state">
                <User className="empty-icon" />
                <h3 className="empty-title">No hay empleados registrados</h3>
                <p className="empty-subtitle">Los empleados que agregues aparecerán aquí</p>
              </div>
            ) : (
              <div className="employees-grid">
  {employees.map((employee) => (
    <div key={employee.id || employee._id} className="employee-card">
      <div className="employee-header">
        {/* Nombre y Apellido */}
        <h3 className="employee-name">
          {employee.name} {employee.lastName}
        </h3>
        <div className="employee-actions">
          <button onClick={() => handleEdit(employee)}>
            <Edit className="action-icon" />
          </button>
          <button onClick={() => handleDelete(employee.id || employee._id)}>
            <Trash2 className="action-icon" />
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="employee-details">
        <p className="employee-email">
          <Mail className="detail-icon" /> {employee.email}
        </p>
        <p className="employee-telephone">
          <Phone className="detail-icon" /> {employee.telephone}
        </p>
        <p className="employee-dui">
          <User className="detail-icon" /> DUI: {employee.dui}
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

export default Employees;