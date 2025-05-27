/*
    Campos: 
    name
    lastName
    birthday (esto es de tipo Date o lo puden poner como String)
    email
    address
    hireDate (esto es de tipo Date o lo puden poner como String)
    password
    telephone
    dui
    isssNumber
    isVerified (esto es booleano)
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 100,
    },
    lastname: {
      type: String,
      require: true,
      maxLength: 100,
    },
    email: {
        type: String,
        require: true,
        maxLength: 100,
    },
    password: {
        type: String,
        require: true,
        maxLength: 100,
    },
    telephone: {
        type: String,
        require: true,
        min: 0,
    },
    dui: {
        type: String,
        require: true,
        min: 0,
    },
    isVerified:{
        type: String,
        require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Employees", employeesSchema);