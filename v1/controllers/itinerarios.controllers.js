import { upload } from "../middlewares/multer.middleware.js";
import { runMulterSingle } from "../utils/multer.util.js";
import {
    crearItinerarioService,
    obtenerItinerariosService,
    obtenerItinerarioPorIdService,
    actualizarItinerarioService,
    eliminarItinerarioService,
    subirImagenItinerarioService, 
    obtenerClimaItinerarioService
} from "../services/itinerarios.services.js";

export const crearItinerario = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const itinerarioData = req.validatedBody;

        const resultado = await crearItinerarioService(usuarioId, itinerarioData);

        return res.status(201).json(resultado);
    } catch (error) {
        next(error);//pasa el error al middleware de manejo de errores para que lo procese y envíe una respuesta adecuada al cliente.
    }
};

export const obtenerItinerarios = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const page = req.query.page;
        const limit = req.query.limit;
        
        const resultado = await obtenerItinerariosService(usuarioId, page, limit);

        return res.status(200).json({
            success: true,
            ...resultado
        });
    } catch (error) {
        next(error);
    }
};

export const obtenerItinerarioPorId = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { id } = req.params;

        const itinerario = await obtenerItinerarioPorIdService(id, usuarioId);

        return res.status(200).json({
            success: true,
            itinerario
        });
    } catch (error) {
        next(error);
    }
};

export const actualizarItinerario = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { id } = req.params;
        const itinerarioData = req.validatedBody;

        const resultado = await actualizarItinerarioService(id, usuarioId, itinerarioData);

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const eliminarItinerario = async (req, res, next) => {   
    try {
        const usuarioId = req.user.id;
        const { id } = req.params;

        const resultado = await eliminarItinerarioService(id, usuarioId);

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const subirImagenItinerario = async (req, res, next) => {
    try {
        await runMulterSingle(upload, "imagen", req, res);

        const usuarioId = req.user.id;
        const { id } = req.params;

        const resultado = await subirImagenItinerarioService(id, usuarioId, req.file);

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const obtenerClimaItinerario = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const { id } = req.params;

        const resultado = await obtenerClimaItinerarioService(id, usuarioId);

        return res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};
