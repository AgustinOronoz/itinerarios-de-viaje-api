import {
    crearItinerarioService,
    obtenerItinerariosService,
    obtenerItinerarioPorIdService,
    actualizarItinerarioService,
    eliminarItinerarioService
} from "../services/itinerarios.services.js";

export const crearItinerario = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const itinerarioData = req.validateBody;

        const resultado = await crearItinerarioService(usuarioId, itinerarioData);

        return res.status(201).json(resultado);
    } catch (error) {
        next(error);//pasa el error al middleware de manejo de errores para que lo procese y envíe una respuesta adecuada al cliente.
    }
};

export const obtenerItinerarios = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;
        const itinerarios = await obtenerItinerariosService(usuarioId);

        return res.status(200).json({
            success: true,
            itinerarios
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
        const itinerarioData = req.validateBody;

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