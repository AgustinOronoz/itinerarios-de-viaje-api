import Joi from "joi"; 

export const actualizarUsuarioSchema = Joi.object({
    nombre: Joi.string().trim().min(3).max(30).optional().messages({
        "string.base": "El nombre del usuario debe ser un texto",
        "string.empty": "El nombre del usuario no puede estar vacio",
        "string.min": "El nombre del usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre del usuario debe tener como maximo {#limit} caracteres",
        "any.required": "El nombre del usuario es obligatorio" 
    }),
    password: Joi.string().trim().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
        "string.base": "La contraseña del usuario debe ser un texto",
        "string.empty": "La contraseña del usuario no puede estar vacia",
        "string.min": "La contraseña del usuario debe tener al menos {#limit} caracteres",
        "string.pattern.base": "La contraseña del usuario debe contener al menos una letra mayuscula, una letra minuscula y un numero",
        "any.required": "La contraseña del usuario es obligatoria" 
    }),

    repetirPassword: Joi.string().trim().valid(Joi.ref("password")).messages({
        "string.base": "El campo repetirPassword debe ser un texto",
        "string.empty": "El campo repetirPassword no puede estar vacio",
        "any.only": "El campo repetirPassword debe ser igual al campo password"
    }), 
     plan: Joi.string().trim().valid("premium").required().messages({
            "string.base": "El plan debe ser un texto",
            "string.empty": "El plan no puede estar vacio",
            "any.only": "El plan debe ser premium",
            "any.required": "El plan es obligatorio"
        }),
})
.with("password", "repetirPassword")
.min(1)
.messages({
    "object.min": "Debes enviar al menos un campo para actualizar",
    "object.with": "Si envias password, debes enviar repetirPassword"
});