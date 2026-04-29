import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

// Limitar intentos de login: máximo 5 intentos por IP cada 15 minutos
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos por IP
    message: {
        success: false,
        message: "Demasiados intentos de login. Intenta de nuevo después de 15 minutos."
    },
    standardHeaders: false, // No envia cuantos intentos quedan en los headers
    legacyHeaders: false, // No envia headers de ratelimit antiguos
    keyGenerator: ipKeyGenerator // Usa el helper de express-rate-limit para IPv6
});