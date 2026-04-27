import axios from "axios";

export const getModelsService = async () => {
    return {
        success: true,
        message: "List of AI models",
        models: [
            {
                id: "gemini-2.5-flash",
                nombre: "Gemini 2.5 Flash"
            }
        ]
    };
};

export const useGemini25FlashService = async (prompt) => {
    const API_KEY = process.env.GEMINI_25_API_KEY;

    if (!API_KEY) {
        const error = new Error("La API key de Gemini no está configurada");
        error.status = 500;
        throw error;
    }
    const MODEL = "gemini-2.5-flash";
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    const headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
    };

    const body = {
        contents: [
            {
                parts: [{ text: prompt }]
            }
        ]
    };

    try {
        const response = await axios.post(ENDPOINT, body, { headers });

        const textoGenerado =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

         return {
            success: true,
            message: "Gemini 2.5 Flash response",
            final: textoGenerado
        };
    } catch (err) {
        const error = new Error("Error al consumir Gemini 2.5 Flash");
        error.status = 502;
        error.details = err.response?.data || null;
        throw error;
    }
};