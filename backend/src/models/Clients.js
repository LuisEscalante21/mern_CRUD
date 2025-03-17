/*
    Campos: 
        name
        lastName
        birthday
        email
        password
        telephone
        dui
        isVerified (esto es booleano)
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
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
    birthday: {
      type: Date,
      require: true,
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
        type: Boolean,
        require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", clientsSchema);