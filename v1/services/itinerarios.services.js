
import Itinerario from "../models/itinerario.model.js";
import Usuario from "../models/usuario.model.js";
import Categoria from "../models/categoria.model.js";
import { isValidObjectId } from "mongoose";

export const crearItinerarioService = async (usuarioId, itinerarioData) => {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        error.details = { usuarioId };
        throw error;
    }

    const categoria = await Categoria.findById(itinerarioData.categoria);

    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        error.details = { categoria: itinerarioData.categoria };
        throw error;
    }

    if (usuario.plan === "plus") {
        const cantidadItinerarios = await Itinerario.countDocuments({ usuario: usuarioId });

        if (cantidadItinerarios >= 4) {
            const error = new Error("Has alcanzado el límite de 4 itinerarios para el plan plus");
            error.status = 403;
            throw error;
        }
    }

    const nuevoItinerario = new Itinerario({
        ...itinerarioData,
        usuario: usuarioId
    });

    await nuevoItinerario.save();
    
    try {
        await Usuario.findByIdAndUpdate(usuarioId, {
            $push: { itinerarios: nuevoItinerario._id }
        });
    } catch (error) {
        // Si falla el $push, eliminar el itinerario creado
        await Itinerario.findByIdAndDelete(nuevoItinerario._id);
        const pushError = new Error("Error al guardar el itinerario en la lista del usuario");
        pushError.status = 500;
        throw pushError;
    }

    return {
        success: true,
        message: "Itinerario creado exitosamente",
        itinerario: nuevoItinerario
    };
};

export const obtenerItinerariosService = async (usuarioId) => {
    const itinerarios = await Itinerario.find({ usuario: usuarioId })
        .populate("categoria", "nombre")
        .populate("usuario", "nombre");

    return itinerarios;
};


export const obtenerItinerarioPorIdService = async (id, usuarioId) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const itinerario = await Itinerario.findOne({
        _id: id,
        usuario: usuarioId
    })
        .populate("categoria", "nombre")
        .populate("usuario", "nombre email");

    if (!itinerario) {
        const error = new Error("Itinerario no encontrado");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return itinerario;
};

export const actualizarItinerarioService = async (id, usuarioId, itinerarioData) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const itinerario = await Itinerario.findOne({
        _id: id,
        usuario: usuarioId
    });

    if (!itinerario) {
        const error = new Error("Itinerario no encontrado");
        error.status = 404;
        error.details = { id };
        throw error;
    }
        
    if (itinerarioData.categoria) {
        const categoria = await Categoria.findById(itinerarioData.categoria);

        if (!categoria) {
            const error = new Error("Categoría no encontrada");
            error.status = 404;
            error.details = { categoria: itinerarioData.categoria };
            throw error;
        }
    }

    const itinerarioActualizado = await Itinerario.findByIdAndUpdate(
        id,
        itinerarioData,
        { new: true, runValidators: true }
    )
        .populate("categoria", "nombre")
        .populate("usuario", "nombre email");

    return {
        success: true,
        message: "Itinerario actualizado exitosamente",
        itinerario: itinerarioActualizado
    };
};



export const eliminarItinerarioService = async (id, usuarioId) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const itinerarioEliminado = await Itinerario.findOneAndDelete({
        _id: id,
        usuario: usuarioId
    });

    if (!itinerarioEliminado) {
        const error = new Error("Itinerario no encontrado");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    try {
        await Usuario.findByIdAndUpdate(usuarioId, {
            $pull: { itinerarios: id }
        });
    } catch (error) {
        // Advertencia: el itinerario ya se eliminó pero falló el $pull del usuario
        console.error(`Advertencia: No se pudo eliminar itinerario ${id} de la lista del usuario ${usuarioId}`);
    }

    return {
        success: true,
        message: "Itinerario eliminado exitosamente"
    };
};