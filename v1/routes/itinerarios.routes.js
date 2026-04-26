import express from 'express';
import { requiredRolMiddleware } from '../middlewares/requiredRol.middleware.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearItinerarioSchema } from '../validators/itinerarioCrear.validators.js';
import { actualizarItinerarioSchema } from '../validators/itinerarioActualizar.validators.js';
import { crearItinerario,
    obtenerItinerarios,
    obtenerItinerarioPorId,
actualizarItinerario ,
eliminarItinerario
 } from '../controllers/itinerarios.controllers.js';


const router = express.Router({mergeParams: true});

router.post("/", requiredRolMiddleware("viajero"),validateBodyMiddleware(crearItinerarioSchema), crearItinerario);
router.get("/", requiredRolMiddleware("viajero"), obtenerItinerarios);
router.get("/:id", requiredRolMiddleware("viajero"), obtenerItinerarioPorId);  
router.patch("/:id", requiredRolMiddleware("viajero"), validateBodyMiddleware(actualizarItinerarioSchema), actualizarItinerario); 
router.delete("/:id", requiredRolMiddleware("viajero"), eliminarItinerario);    




export default router;