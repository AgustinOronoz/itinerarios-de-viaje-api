import express from 'express';      
import { authorizeMiddleware } from "./middlewares/authorization.middleware.js";   
import authRouter from "./routes/auth.routes.js";  
import usuariosRouter from "./routes/usuarios.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import itinerariosRouter from "./routes/itinerarios.routes.js";

const router = express.Router();


//RUTAS DESPROTEGIDAS
router.use("/auth", authRouter);



router.use(authorizeMiddleware); // se aplica el middleware de autorización a todas las rutas siguientes, asegurando que solo los usuarios autenticados puedan acceder a ellas


//RUTAS PROTEGIDAS
router.use("/categorias", categoriasRouter); 
router.use("/itinerarios", itinerariosRouter); 

router.use("/usuarios", usuariosRouter); 

export default router; //se exporta el router para poder usarlo en el archivo app.js

