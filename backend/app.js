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
import logoutRoutes from "./src/routes/logout.js"
import registerClientsRoutes from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRoutes from "./src/routes/blog.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
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
app.use("/api/employees", validateAuthToken(["employee", "Admin"]), employeesRoutes); 
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationsRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/registerClients", registerClientsRoutes)
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRoutes);

// Exporto la constante para poder usar express en otros lados
export default app;
