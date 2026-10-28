# Itinerarios de Viaje — API REST

Backend de una app para armar y guardar itinerarios de viaje. Proyecto en equipo (2 personas) para la materia **Desarrollo Full Stack con IA** — Universidad ORT Uruguay, 2026.

## Qué hace

- Registro y login de usuarios con autenticación por **JWT**.
- CRUD completo de itinerarios (crear, listar con paginación, editar, eliminar), organizados por categorías.
- Subida de imágenes de cada itinerario a **Cloudinary**.
- Consulta del clima del destino a través de una API externa.
- Generación de contenido con IA: integración real con **Google Gemini 2.5 Flash** para asistir en la creación de itinerarios.
- Límites de uso según el plan del usuario (free / plus).
- Manejo de errores centralizado y validación de datos de entrada con **Joi**.

## Stack

Node.js · Express 5 · MongoDB / Mongoose · JWT · Cloudinary · Joi · Axios · Multer · CORS · express-rate-limit

## Arquitectura

API versionada (`/v1`), organizada por capas: `routes` → `controllers` → `services` → `models`, con `middlewares` para autenticación/autorización y manejo de errores, y `validators` para los esquemas de entrada.

```
v1/
  routes/         definición de endpoints
  controllers/    reciben la request y delegan al service
  services/       lógica de negocio
  models/         esquemas de Mongoose
  middlewares/    auth, manejo de errores, 404
  validators/     validación de payloads (Joi)
  utils/          helpers (Cloudinary, multer)
```

## Cómo correrlo localmente

```bash
npm install
```

Copiar `.env.example` como `.env` en la raíz y completar las variables:

```
MONGODB_URI=
SECRET_JWT=
GEMINI_25_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=3000
```

```bash
npm run dev
```
