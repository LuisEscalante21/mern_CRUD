import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Products from "./pages/Products/Products";
import Employees from "./pages/Employees/Employees";
import Branches from "./pages/Branches/Branches";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/branches" element={<Branches />} />
      </Routes>
    </Router>
  );
}

export default App;
