import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/auth.controllers.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { loginLimiter } from '../middlewares/rateLimitLogin.middleware.js';
import { registrarUsuarioSchema } from '../validators/authRegistro.validators.js';
import { loginUsuarioSchema } from '../validators/authLogin.validators.js';

const router = express.Router({mergeParams: true});

router.post('/registro', validateBodyMiddleware(registrarUsuarioSchema),registrarUsuario);
router.post('/login', loginLimiter, validateBodyMiddleware(loginUsuarioSchema), loginUsuario);

export default router;