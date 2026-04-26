export const notFoundMiddleware = (req, res, next) => { //middleware que se ejecuta cuando no se encuentra la ruta, se encarga de enviar una respuesta con el mensaje "Ruta no encontrada")
    res.status(404).json({mensaje: "Ruta no encontrada"});
}