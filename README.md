# CivicaMap Frontend

Interfaz web estática con Vite. La API y la lógica de negocio están en el
proyecto `CivicaMap Backend`; este proyecto solo contiene vistas y código de
cliente. Las plantillas Blade originales de `resources/views/` se conservan
como referencia; la interfaz ejecutable es `index.html`.

## Ejecutar

1. Inicia el backend según su README (por defecto `http://localhost:8000`).
2. Crea `.env` a partir de `.env.example` y ajusta `VITE_API_BASE_URL` si la API
   está en otra dirección. Debe incluir el prefijo `/api/v1`.
3. Ejecuta `npm ci` y `npm run dev`.

En Vite, el frontend queda disponible normalmente en `http://localhost:5173`.
Para compilar usa `npm run build`; el resultado estático se genera en `dist/`.
La navegación utiliza fragmentos (`#/...`), así que todas las vistas se sirven
desde `index.html`.

## Funciones conectadas

- `RecursosService` consulta el listado y el detalle de reportes mediante
  `GET /reportes` y `GET /reportes/{id}` (bajo `/api/v1`); normaliza las rutas
  de evidencias a URLs públicas `/storage/...` y muestra mensajes específicos
  para errores 404, 500 y de conexión.
- La vista de reportes presenta tarjetas, estados de carga/vacío/error y detalle
  con galería de evidencias; si una imagen no carga, muestra un placeholder.
- Registro, inicio y cierre de sesión de clientes (token Sanctum Bearer).
- Catálogo público de servicios y creación de solicitudes del cliente.
- Perfil del cliente y consulta de sus solicitudes.
- Mapa/listado de reportes, consulta de categorías y creación de reportes con
  evidencia opcional.

El backend debe permitir CORS desde el origen del frontend (`FRONTEND_URL` en
su `.env`). La API actual no autentica las rutas públicas de reportes ni ofrece
autenticación administrativa; por eso la interfaz no muestra operaciones
administrativas ni permite editar/eliminar reportes.
La configuración CORS del backend permite por defecto `http://localhost:5173`
y `http://127.0.0.1:5173`; si usas otro host o puerto, agrega su origen a
`FRONTEND_URL` y limpia la caché de configuración de Laravel.
