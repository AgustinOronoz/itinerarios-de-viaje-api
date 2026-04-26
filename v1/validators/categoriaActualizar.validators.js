import Joi from "joi"; 

export const actualizarCategoriaSchema = Joi.object({
    nombre: Joi.string().trim().min(4).max(30).lowercase().optional().messages({
        "string.base": "El nombre de la categoria debe ser un texto",
        "string.empty": "El nombre de la categoria no puede estar vacio",
        "string.min": "El nombre de la categoria debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de la categoria debe tener como maximo {#limit} caracteres",
        "any.required": "El nombre de la categoria es obligatorio" 
    }), 
    descripcion: Joi.string().trim().lowercase().optional().messages({
        "string.base": "La descripcion de la categoria debe ser un texto",
        "string.empty": "La descripcion de la categoria no puede estar vacia",
        "any.required": "La descripcion de la categoria es obligatoria"
    }),})
.min(1)
.messages({
    "object.min": "Debes enviar al menos un campo para actualizar",
});