import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  useEffect(() => {
    const navCSS = `
      .nav-link:hover {
        background-color: #555 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = navCSS;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link} className="nav-link">Productos</Link>
      <Link to="/employees" style={styles.link} className="nav-link">Empleados</Link>
      <Link to="/branches" style={styles.link} className="nav-link">Sucursales</Link>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "1em",
    display: "flex",
    justifyContent: "center", 
    gap: "2em", 
    position: "fixed",
    top: 0,
    width: "100%", 
    zIndex: 1000, 
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "0.5em 1em",
    transition: "all 0.3s ease", 
    borderRadius: "4px", 
  },
};

export default NavBar;