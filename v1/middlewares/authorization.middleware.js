import jwt from 'jsonwebtoken';


 

export const authorizeMiddleware = (req, res, next) => { 
    const auth = req.headers.authorization; // obtener header Authorization
    if (!auth) {
        return res.status(401).json({ message: "No se proporcionó header de autorización" });
    }

    const token = auth.split(" ")[1]; // extraer token del formato "Bearer <token>",
                                    // [1] es la posicion en la q se encuentra el token, luego de aplicar .split()
    if (!token) {
        return res.status(401).json({ message: "Token de autorización no válido" });
    }

    // Verificar el token dentro del scope donde 'token' está definido
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token de autorización no válido" });
        }
        req.user = decoded; // almacenar información del usuario decodificada en req.user
        next(); // continuar con la siguiente función middleware o ruta
       
    }); 
 }               