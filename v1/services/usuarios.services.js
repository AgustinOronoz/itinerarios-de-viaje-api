import bcryptjs from "bcryptjs";
import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async (page = 1, limit = 10) => {
    // Convertir a números y validar
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, Math.min(100, parseInt(limit) || 10)); // máximo 100 por página
    
    const skip = (page - 1) * limit;
    
    // Obtener total de documentos
    const total = await Usuario.countDocuments();
    
    // Obtener documentos paginados
    const usuarios = await Usuario.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    
    return {
        data: usuarios,
        pagination: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const obtenerUsuarioPorIdService = async (id) => {

    if(!isValidObjectId(id)){
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const usuario = await Usuario.findById(id).select("-password");



    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        error.details = { id };
        throw error;
    }
    return usuario;

};


export const actualizarUsuarioService = async (id, userData) => {
    const datosActualizados = {};

    if (userData.nombre) {
        datosActualizados.nombre = userData.nombre;
    }

    if (userData.password) {
        const hashedPassword = bcryptjs.hashSync(
            userData.password,
            Number(process.env.SALT_ROUNDS)
        );
        datosActualizados.password = hashedPassword;
    }

    if (userData.plan) {
        datosActualizados.plan = userData.plan;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        datosActualizados,
        { new: true, runValidators: true }
    ).select("-password");

    if (!usuarioActualizado) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    return usuarioActualizado;
};

export const eliminarUsuarioService = async (id) => {
     const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return usuarioEliminado;
};