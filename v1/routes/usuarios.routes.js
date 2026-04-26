import express from 'express'; 
import { actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarios
 } from '../controllers/usuarios.controllers.js';
import { requiredRolMiddleware } from '../middlewares/requiredRol.middleware.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { actualizarUsuarioSchema } from '../validators/usuarioActualizar.validators.js';


const router = express.Router({mergeParams: true}); 
//PENSAR SI AGREGAR RUTA PARA Q TRAVELER OBTENGA USUARIO PROPIO

router.get("/", requiredRolMiddleware("admin"),obtenerUsuarios);
router.get("/:id", requiredRolMiddleware("admin"), obtenerUsuarioPorId);
router.patch("/", requiredRolMiddleware("viajero"), validateBodyMiddleware(actualizarUsuarioSchema) ,actualizarUsuario); 
router.delete("/", requiredRolMiddleware("viajero"), eliminarUsuario);

export default router; 