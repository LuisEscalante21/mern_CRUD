// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js"
import reviewsRoutes from "./src/routes/reviews.js";
import evaluationsRoutes from "./src/routes/evaluations.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";
import cookieParser from "cookie-parser";

// Creo una constante que es igual
// a la libreria que importé y la ejecuta
const app = express();

// Uso un middleware para que acepte datos Json
app.use(express.json());

// que acepte cookies
app.use(cookieParser());

// Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes); 
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationsRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);

// Exporto la constante para poder usar express en otros lados
export default app;
