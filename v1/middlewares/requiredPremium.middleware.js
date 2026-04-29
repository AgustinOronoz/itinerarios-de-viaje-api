import Usuario from "../models/Usuario.model.js";

export const requiredPremiumMiddleware = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (usuario.plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "Solo los usuarios premium pueden usar esta funcionalidad"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};