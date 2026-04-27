import Joi from "joi";

export const useGeminiSchema = Joi.object({
    prompt: Joi.string().trim().min(3).required().messages({
        "string.base": "El prompt debe ser un texto",
        "string.empty": "El prompt no puede estar vacío",
        "string.min": "El prompt debe tener al menos {#limit} caracteres",
        "any.required": "El prompt es obligatorio"
    })
});