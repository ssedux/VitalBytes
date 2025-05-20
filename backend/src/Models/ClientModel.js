import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
      validate: {
        validator: function(v) {
          return /@/.test(v); 
        },
        message: props => `${props.value} no es un correo válido. Debe contener '@'.`
      }
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,

    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    birth:{
        type: Date,
        required: true,
        validate: {
          validator: function(v) {
            return v instanceof Date && !isNaN(v.getTime());
          },
          message: props => `${props.value} no es una fecha válida.`
        }
    },
    
    phone:{
      type: String,
      required: true
    }},
{
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", ClientSchema);