export const errorMiddleware = (err, req, res, next) => {
    //eliminar el stack
    console.error(err.stack);
       res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
        details: err.details || null
    });}  //capura cualquier error que ocurra en las rutas y lo maneja de forma centralizada, evitando que el servidor se caiga por errores no manejados.