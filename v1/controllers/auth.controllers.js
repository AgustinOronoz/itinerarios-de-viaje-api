import { registrarUsuarioService, loginUsuarioService } from '../services/auth.services.js';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res, next) => {
    try {
        const resultado = await registrarUsuarioService(req.validateBody);
        const token = jwt.sign({ id: resultado.usuario.id,
            email: resultado.usuario.email,
            rol: resultado.usuario.rol,
            plan: resultado.usuario.plan
        }, process.env.SECRET_JWT, { expiresIn: '1d' });
        return res.status(201).json({ resultado, token });
    } catch (error) {
        next(error);
    }
};

export const loginUsuario = async (req, res, next) => {
    try {
        const resultado = await loginUsuarioService(req.validateBody);
        const token = jwt.sign({ id: resultado.usuario.id,
            email: resultado.usuario.email,
            rol: resultado.usuario.rol,
            plan: resultado.usuario.plan
        }, process.env.SECRET_JWT, { expiresIn: '1d' });
        return res.status(201).json({ resultado, token });
    } catch (error) {
        next(error);
    }
};

