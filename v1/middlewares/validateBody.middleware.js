export const validateBodyMiddleware = schema => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        
         if (error) {
            return res.status(400).json({
                success: false,
                message: "Error de validación",
                details: error.details
            });
        }
        req.validateBody = value; //si la validacion es correcta, se guarda el valor validado en el objeto req para que pueda ser utilizado en el controlador, el req.validateBody es el valor validado que se guarda en el middleware validateBodyMiddleware
        next();
    };
};

//funcion wraper que recibe un esquema de validacion y
// devuelve una funcion de middleware que valida el cuerpo
//  de la peticion utilizando el esquema de validacion,
//  si la validacion es correcta, 
// se guarda el valor validado en el objeto req 
//  para que pueda ser utilizado en el controlador, 
// si la validacion es incorrecta, 
// se devuelve una respuesta al cliente con un error 400 y
//  los detalles del error de validacion

// stripUnknown: true es una opción que le dice a Joi 
// que elimine cualquier campo que no esté definido en el esquema de validación,
//  esto ayuda a evitar que se envíen datos no deseados
//  o maliciosos en el cuerpo de la petición, y 
// también hace que el objeto validado sea más limpio y fácil de manejar en el controlador.

//abortEarly: false es una opción que le dice a Joi
//  que no se detenga en el primer error de validación que encuentre,
//  sino que continúe validando todo el objeto y recopile todos los errores
//  de validación en un solo objeto de error, esto es útil para proporcionar
//  al cliente una lista completa de todos los errores de validación en lugar de tener que corregirlos uno por uno.