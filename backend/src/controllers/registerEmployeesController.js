const registerEmployeesController = {};

import Employee from "../models/Employees.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js";

// I N S E R T
registerEmployeesController.register = async (req, res) => {
  const { name, lastName, email, password, telephone, dui, isVerified} = req.body;
  try{

    //Verifica si existe el empleado
    const existEmployee = await Employee.findOne({email})
    if(existEmployee){
        return res.json({ message: "employee already exist" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newEmployee = new Employee({name, lastName, email, password: passwordHash, telephone, dui, isVerified });
    await newEmployee.save();
    res.json({ message: "employee saved" });

    jsonwebtoken.sign(
        //1- que voy a guardar
        {id: newEmployee._id},
        //2- clave secreta
        config.JWT.secret,
        //3- cuando expira
        {expiresIn: config.JWT.expiresIn},
        //4- funcion flecha
        (error, token) => {
            if(error) console.log (error);
            res.cookie("authToken", token);
        }
    );
  }
  catch (error) {
     console.log(error);
     res.json({ message: "error register employee" });
  }
};

export default registerEmployeesController;