import mongoose from "mongoose";
import Categoria from "../models/categoria.model.js";
const { isValidObjectId } = mongoose;

export const crearCategoriaService = async (categoriaData) => {
    const categoriaExistente = await Categoria.findOne({ nombre: categoriaData.nombre });

    if (categoriaExistente) {
        const error = new Error("Ya existe una categoria con ese nombre");
        error.status = 409;
        error.details = { nombre: categoriaData.nombre };
        throw error;
    }

    const nuevaCategoria = new Categoria(categoriaData);
    await nuevaCategoria.save();

    return {
        success: true,
        message: "Categoria creada exitosamente",
        categoria: nuevaCategoria
    };
};

export const obtenerCategoriasService = async (page = 1, limit = 10) => {
    // Convertir a números y validar
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, Math.min(100, parseInt(limit) || 10)); // máximo 100 por página
    
    const skip = (page - 1) * limit;
    
    // Obtener total de documentos
    const total = await Categoria.countDocuments();
    
    // Obtener documentos paginados
    const categorias = await Categoria.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    
    return {
        data: categorias,
        pagination: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const obtenerCategoriaPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const error = new Error("Categoria no encontrada");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return categoria;
}; 

export const actualizarCategoriaService = async (id, categoriaData) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    if (categoriaData.nombre) {
        const categoriaExistente = await Categoria.findOne({
            nombre: categoriaData.nombre,
            _id: { $ne: id } //_id diferente al que se está actualizando para evitar conflicto con sí mismo, $ne significa "not equal" (no igual) en MongoDB. Evita que se considere el mismo documento al buscar por nombre.
        });

        if (categoriaExistente) {
            const error = new Error("Ya existe una categoria con ese nombre");
            error.status = 409;
            error.details = { nombre: categoriaData.nombre };
            throw error;
        }
    }

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
        id,
        categoriaData,
        { new: true, runValidators: true } //new: true hace que el método devuelva el documento actualizado en lugar del original antes de la actualización. runValidators: true asegura que se apliquen las validaciones definidas en el esquema de Mongoose al actualizar el documento, lo que ayuda a mantener la integridad de los datos.
    );

    if (!categoriaActualizada) {
        const error = new Error("Categoria no encontrada");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return categoriaActualizada;
};

export const eliminarCategoriaService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Id con formato erroneo");
        error.status = 400;
        error.details = { id };
        throw error;
    }

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
        const error = new Error("Categoria no encontrada");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return categoriaEliminada;
};