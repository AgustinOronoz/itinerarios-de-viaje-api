import Joi from "joi"; 

export const registrarUsuarioSchema = Joi.object({
    nombre: Joi.string().trim().min(3).max(30).required().messages({
        "string.base": "El nombre del usuario debe ser un texto",
        "string.empty": "El nombre del usuario no puede estar vacio",
        "string.min": "El nombre del usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del usuario debe tener como maximo {#limit} caracteres",
        "any.required": "El nombre del usuario es obligatorio" 
    }), 
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
    repetirPassword: Joi.string().trim().valid(Joi.ref("password")).required().messages({
        "string.base": "El campo repetirPassword debe ser un texto",
        "string.empty": "El campo repetirPassword no puede estar vacio",
        "any.only": "El campo repetirPassword debe ser igual al campo password",
        "any.required": "El campo repetirPassword es obligatorio" 
         
    }), 

    rol: Joi.string().trim().valid("admin", "viajero").required().messages({
        "string.base": "El rol debe ser un texto",
        "string.empty": "El rol no puede estar vacio",
        "any.only": "El rol debe ser admin o viajero",
        "any.required": "El rol es obligatorio"
    }),
});