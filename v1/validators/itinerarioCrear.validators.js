import Joi from "joi"; 

export const crearItinerarioSchema = Joi.object({
    titulo: Joi.string().trim().min(3).max(100).required().messages({
        "string.base": "El título del itinerario debe ser un texto",
        "string.empty": "El título del itinerario no puede estar vacío",
        "string.min": "El título del itinerario debe tener al menos {#limit} caracteres",
        "string.max": "El título del itinerario debe tener como máximo {#limit} caracteres",
        "any.required": "El título del itinerario es obligatorio"
    }),

    descripcion: Joi.string().trim().min(10).max(1000).required().messages({
        "string.base": "La descripción del itinerario debe ser un texto",
        "string.empty": "La descripción del itinerario no puede estar vacía",
        "string.min": "La descripción del itinerario debe tener al menos {#limit} caracteres",
        "string.max": "La descripción del itinerario debe tener como máximo {#limit} caracteres",
        "any.required": "La descripción del itinerario es obligatoria"
    }),

    pais: Joi.string().trim().min(2).max(60).required().messages({
        "string.base": "El país debe ser un texto",
        "string.empty": "El país no puede estar vacío",
        "string.min": "El país debe tener al menos {#limit} caracteres",
        "string.max": "El país debe tener como máximo {#limit} caracteres",
        "any.required": "El país es obligatorio"
    }),

    ciudad: Joi.string().trim().min(2).max(60).required().messages({
        "string.base": "La ciudad debe ser un texto",
        "string.empty": "La ciudad no puede estar vacía",
        "string.min": "La ciudad debe tener al menos {#limit} caracteres",
        "string.max": "La ciudad debe tener como máximo {#limit} caracteres",
        "any.required": "La ciudad es obligatoria"
    }),

    categoria: Joi.string().trim().hex().length(24).required().messages({
        "string.base": "La categoría debe ser un texto",
        "string.empty": "La categoría no puede estar vacía",
        "string.hex": "La categoría debe tener un formato de id válido",
        "string.length": "La categoría debe tener un formato de id válido",
        "any.required": "La categoría es obligatoria"
    }),

    fechaInicial: Joi.date().required().messages({
        "date.base": "La fecha inicial debe ser una fecha válida",
        "any.required": "La fecha inicial es obligatoria"
    }),

    fechaFinal: Joi.date().greater(Joi.ref("fechaInicial")).required().messages({
        "date.base": "La fecha final debe ser una fecha válida",
        "date.greater": "La fecha final debe ser posterior a la fecha inicial",
        "any.required": "La fecha final es obligatoria"
    }),

    presupuesto: Joi.number().positive().required().messages({
        "number.base": "El presupuesto debe ser un número",
        "number.positive": "El presupuesto debe ser mayor que 0",
        "any.required": "El presupuesto es obligatorio"
    }),
    imagenUrl: Joi.string().uri().optional().messages({
        "string.base": "La URL de la imagen debe ser un texto", //va a guardar la url que es un texto, con uri() se asegura que tenga formato de url
        "string.uri": "La URL de la imagen debe ser una URL válida",
    }),
});