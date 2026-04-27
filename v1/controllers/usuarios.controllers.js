import { obtenerUsuariosService, 
    obtenerUsuarioPorIdService, 
    actualizarUsuarioService,
     eliminarUsuarioService } from '../services/usuarios.services.js';

export const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await obtenerUsuariosService();

        return res.status(200).json({
            success: true,
            usuarios
        });
    } catch (error) {
        next(error);
    }
};

export const obtenerUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await obtenerUsuarioPorIdService(id);

        return res.status(200).json({
            success: true,
            usuario
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarUsuario = async (req, res, next) => {
    try {
        const id = req.user.id;
        const userData = req.validatedBody;

        const usuarioActualizado = await actualizarUsuarioService(id, userData);

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        next(error);
    }
};

export const eliminarUsuario = async (req, res, next) => {
    try {
        const id = req.user.id;

        await eliminarUsuarioService(id);

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        next(error);
    }
};