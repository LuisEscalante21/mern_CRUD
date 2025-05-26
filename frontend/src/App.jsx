import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Products from "./pages/Products/Products";
import Employees from "./pages/Employees";
import Clients from "./pages/Clients";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </Router>
  );
}

export default App;
