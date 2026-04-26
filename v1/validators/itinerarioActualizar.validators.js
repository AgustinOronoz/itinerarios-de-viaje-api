import Joi from "joi"; 

export const actualizarItinerarioSchema = Joi.object({
    titulo: Joi.string().trim().min(3).max(100).optional().messages({
        "string.base": "El título del itinerario debe ser un texto",
        "string.empty": "El título del itinerario no puede estar vacío",
        "string.min": "El título del itinerario debe tener al menos {#limit} caracteres",
        "string.max": "El título del itinerario debe tener como máximo {#limit} caracteres"
    }),

    descripcion: Joi.string().trim().min(10).max(1000).optional().messages({
        "string.base": "La descripción del itinerario debe ser un texto",
        "string.empty": "La descripción del itinerario no puede estar vacía",
        "string.min": "La descripción del itinerario debe tener al menos {#limit} caracteres",
        "string.max": "La descripción del itinerario debe tener como máximo {#limit} caracteres"
    }),
    pais: Joi.string().trim().min(2).max(60).optional().messages({
        "string.base": "El país debe ser un texto",
        "string.empty": "El país no puede estar vacío",
        "string.min": "El país debe tener al menos {#limit} caracteres",
        "string.max": "El país debe tener como máximo {#limit} caracteres"
    }),

    ciudad: Joi.string().trim().min(2).max(60).optional().messages({
        "string.base": "La ciudad debe ser un texto",
        "string.empty": "La ciudad no puede estar vacía",
        "string.min": "La ciudad debe tener al menos {#limit} caracteres",
        "string.max": "La ciudad debe tener como máximo {#limit} caracteres"
    }),

    categoria: Joi.string().trim().hex().length(24).optional().messages({
        "string.base": "La categoría debe ser un texto",
        "string.empty": "La categoría no puede estar vacía",
        "string.hex": "La categoría debe tener un formato de id válido",
        "string.length": "La categoría debe tener un formato de id válido"

    }),

    duracionDias: Joi.number().integer().positive().optional().messages({
        "number.base": "La duración en días debe ser un número",
        "number.integer": "La duración en días debe ser un número entero",
        "number.positive": "La duración en días debe ser mayor que 0"
    }),

    presupuesto: Joi.number().positive().optional().messages({
        "number.base": "El presupuesto debe ser un número",
        "number.positive": "El presupuesto debe ser mayor que 0"
  }),
      imagenUrl: Joi.string().uri().optional().messages({
          "string.base": "La URL de la imagen debe ser un texto", //va a guardar la url que es un texto, con uri() se asegura que tenga formato de url
          "string.uri": "La URL de la imagen debe ser una URL válida"
      }),
        esPublico: Joi.boolean().optional().messages({
            "boolean.base": "El campo esPublico debe ser un valor booleano"
        }),
})
.min(1)
.messages({
    "object.min": "Debes enviar al menos un campo para actualizar",
});