import express from 'express';
import { useGemini25Flash, getModels } from '../controllers/ai.controllers.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { useGeminiSchema } from '../validators/ai.validators.js';
import { requiredRolMiddleware } from '../middlewares/requiredRol.middleware.js';
import { requiredPremiumMiddleware } from '../middlewares/requiredPremium.middleware.js';

const router = express.Router({mergeParams: true});

router.get("/", getModels);
router.post("/", requiredRolMiddleware("viajero"),
                 requiredPremiumMiddleware,
                 validateBodyMiddleware(useGeminiSchema), useGemini25Flash);

export default router;