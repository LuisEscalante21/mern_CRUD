const loginController = {};

import EmployeesModel from "../models/Employees.js";
import clientsModel from "../models/Clients.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js";

//Declarar dos constantes para el manejo de errores
//Una que guarde el maximo de intentos de login
//Otra que guarde el tiempo de bloqueo en caso de superar el maximo de intentos

const maxAttempts = 5; // Maximo de intentos de login
const lockTime = 15 * 60 * 1000; // Tiempo de bloqueo en

// I N S E R T
loginController.login = async (req, res) => {
  const { email, password} = req.body;
  try{
    //Validamos los 3 posibles niveles
    //1. Admin, 2. Empleado, 3. Cliente
    let userFound;
    let userType;

    //1. Admin
    if(email == config.emailAdmin.email && password == config.emailAdmin.password){
        userType = "Admin";
        userFound = {_id: "Admin"};
    }else{
        //2. Empleado
        userFound = await EmployeesModel.findOne({email});
        userType = "Employee";

        //3. Cliente
        if(!userFound){
            userFound = await clientsModel.findOne({email});
            userType = "Client";
        }
    }
    // por si no encontramos un usuario
    if(!userFound){
        return res.json({message: "user not found"})
    }

    //Primero validamos si el usuario esta bloqueado
    if(userType !== "Admin"){

        if(userFound.lockTime > Date.now()){
            const minutosRestantes = Math.ceil((userFound.lockTime - Date.now()) / (1000 * 60));
            return res.status(403).json({message: `usuario bloqueado, intenta de nuevo en ${minutosRestantes} minutos`});
        }
    }


    // si no es administrador, validamos la contraseña
    if(userType !== "Admin"){
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if(!isMatch){

            // si la contraseña no coincide, incrementamos el contador de intentos
            userFound.loginAttempts = userFound.loginAttempts + 1;

            // si el contador de intentos supera el maximo, bloqueamos al usuario
        if(userFound.loginAttempts > maxAttempts){
            userFound.lockTime = Date.now() + lockTime; // bloqueamos al usuario por 15 minutos
            await userFound.save();
            return res.status(403).json({message: "usuario bloqueado, intenta de nuevo en 15 minutos"});
        }
            await userFound.save();
            return res.status(401).json({message: "incorrect password"});
    }
        // si la contraseña coincide, reiniciamos el contador de intentos
        userFound.loginAttempts = 0;
        userFound.lockTime = 0; // Reiniciamos el tiempo de bloqueo
        await userFound.save();
    }
    jsonwebtoken.sign(
        //1- que voy a guardar
        {id: userFound._id, userType},
        //2- clave secreta
        config.JWT.secret,
        //3- cuando expira
        {expiresIn: config.JWT.expiresIn},
        //4- funcion flecha
        (error, token) => {
            if(error) console.log (error);
            res.cookie("authToken", token);
            res.json({message: "login sucessful"});
        }
    );
    }
  catch (error) {
     console.log(error);
  }
};

export default loginController;