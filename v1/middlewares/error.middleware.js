export const errorMiddleware = (err, req, res, next) => {
    
    if (process.env.NODE_ENV === 'development') { 
        console.error(err.stack);
    } else {
        console.error('[ERROR]', err.message); // Log sin detalles
    }
    
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? "Error interno del servidor" // Cliente no ve detalles
            : err.message 
    });
}; //capura cualquier error que ocurra en las rutas y lo maneja de forma centralizada, evitando que el servidor se caiga por errores no manejados.