import Categoria from "../models/categoria.model.js";
import { crearCategoriaService, 
    obtenerCategoriasService, 
    obtenerCategoriaPorIdService,
    actualizarCategoriaService,
    eliminarCategoriaService } from "../services/categorias.services.js";

    
export const crearCategoria = async (req, res, next) => {
    try {
        const resultado = await crearCategoriaService(req.validateBody);

        return res.status(201).json(resultado);
    } catch (error) {
        next(error);
    }
};

export const obtenerCategorias = async (req, res, next) => {
    try {
        const categorias = await obtenerCategoriasService();

        return res.status(200).json({
            success: true,
            categorias
        });
    } catch (error) {
        next(error);
    }
};

export const obtenerCategoriaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await obtenerCategoriaPorIdService(id);

        return res.status(200).json({
            success: true,
            categoria
        });
    } catch (error) {
        next(error);
    }
};

export const actualizarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoriaData = req.validateBody;

        const categoriaActualizada = await actualizarCategoriaService(id, categoriaData);

        return res.status(200).json({
            success: true,
            message: "Categoria actualizada correctamente",
            categoria: categoriaActualizada
        });
    } catch (error) {
        next(error);
    }
};

export const eliminarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;

        await eliminarCategoriaService(id);

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada correctamente"
        });
    } catch (error) {
        next(error);
    }
};