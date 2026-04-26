import express from 'express';
import { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoriaPorId,
        actualizarCategoria,
        eliminarCategoria } from '../controllers/categorias.controllers.js';

import { requiredRolMiddleware } from '../middlewares/requiredRol.middleware.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { crearCategoriaSchema } from '../validators/categoriaCrear.validators.js';
import { actualizarCategoriaSchema } from '../validators/categoriaActualizar.validators.js';

const router = express.Router({mergeParams: true});

router.get("/", obtenerCategorias); 
router.get("/:id", obtenerCategoriaPorId);
router.post("/", requiredRolMiddleware("admin"),validateBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.patch("/:id", requiredRolMiddleware("admin"),validateBodyMiddleware(actualizarCategoriaSchema), actualizarCategoria);
router.delete("/:id", requiredRolMiddleware("admin"),eliminarCategoria);




export default router;