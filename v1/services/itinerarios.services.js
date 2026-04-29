import axios from "axios";
import Itinerario from "../models/itinerario.model.js";
import Usuario from "../models/usuario.model.js";
import Categoria from "../models/categoria.model.js";
import { isValidObjectId } from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";

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

export const obtenerItinerariosService = async (usuarioId, page = 1, limit = 10) => {
 
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, Math.min(100, parseInt(limit) || 10));
    
    const skip = (page - 1) * limit;
    
    // Obtener total de documentos
    const total = await Itinerario.countDocuments({ usuario: usuarioId });
    
    // Obtener documentos paginados
    const itinerarios = await Itinerario.find({ usuario: usuarioId })
        .populate("categoria", "nombre")
        .populate("usuario", "nombre")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Ordenar por más recientes primero

    return {
        data: itinerarios,
        pagination: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit)
        }
    };
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
        //  el itinerario ya se eliminó pero falló el $pull del usuario
        console.error(`Advertencia: No se pudo eliminar itinerario ${id} de la lista del usuario ${usuarioId}`);
    }

    return {
        success: true,
        message: "Itinerario eliminado exitosamente"
    };
};

export const subirImagenItinerarioService = async (id, usuarioId, file) => {
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

    if (!file) {
        const error = new Error("No se subió ningún archivo");
        error.status = 400;
        throw error;
    }

    const result = await uploadBufferToCloudinary(cloudinary, file.buffer, {
        resource_type: "auto",
        folder: "itinerarios"
    });

    itinerario.imagenUrl = result.secure_url;
    await itinerario.save();

    return {
        success: true,
        message: "Imagen del itinerario actualizada correctamente",
        itinerario
    };
};

export const obtenerClimaItinerarioService = async (id, usuarioId) => {
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

    if (!itinerario.ciudad || !itinerario.pais) {
        const error = new Error("El itinerario no tiene ciudad o país suficientes para consultar el clima");
        error.status = 400;
        throw error;
    }

    const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";

    const geoResponse = await axios.get(geocodingUrl, {
        params: {
            name: `${itinerario.ciudad}, ${itinerario.pais}`,
            count: 1,
            language: "es",
            format: "json"
        }
    });

    const lugar = geoResponse.data?.results?.[0];

    if (!lugar) {
        const error = new Error("No se pudo encontrar la ubicación para consultar el clima");
        error.status = 404;
        error.details = {
            ciudad: itinerario.ciudad,
            pais: itinerario.pais
        };
        throw error;
    }

    // 2) Forecast
    const forecastUrl = "https://api.open-meteo.com/v1/forecast";

    const forecastResponse = await axios.get(forecastUrl, {
        params: {
            latitude: lugar.latitude,
            longitude: lugar.longitude,
            timezone: "auto",
            current: "temperature_2m,weather_code,wind_speed_10m",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
            forecast_days: Math.min(itinerario.duracionDias || 1, 7) // Limitar a 7 días de pronostico
        }
    });

    const data = forecastResponse.data;

    return {
        success: true,
        message: "Clima obtenido correctamente",
        ubicacion: {
            ciudad: lugar.name,
            pais: lugar.country,
            latitude: lugar.latitude,
            longitude: lugar.longitude
        },
        climaActual: data.current || null,
        pronosticoDiario: data.daily || null
    };
};
