import { getModelsService, useGemini25FlashService } from "../services/ai.services.js";

export const getModels = async (req, res, next) => {
    try {
        const resultado = await getModelsService();

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const useGemini25Flash = async (req, res, next) => {
    try {
        const { prompt } = req.validatedBody;

        const resultado = await useGemini25FlashService(prompt);

        return res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};