import Joi from "joi"; 

export const loginUsuarioSchema = Joi.object({
 
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.base": "El email del usuario debe ser un texto",
        "string.empty": "El email del usuario no puede estar vacio",
        "string.email": "El email del usuario debe ser un email valido"
    }),
    password: Joi.string().trim().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
        "string.base": "La contraseña del usuario debe ser un texto",
        "string.empty": "La contraseña del usuario no puede estar vacia",
        "string.min": "La contraseña del usuario debe tener al menos {#limit} caracteres",
        "string.pattern.base": "La contraseña del usuario debe contener al menos una letra mayuscula, una letra minuscula y un numero",
        "any.required": "La contraseña del usuario es obligatoria" 
    }),
   
  

});