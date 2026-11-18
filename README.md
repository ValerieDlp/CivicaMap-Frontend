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
<<<<<<< HEAD
=======
- **Área administrativa (Actividad 5.2)**, descrita abajo.
>>>>>>> origin/main
- Catálogo público de servicios y creación de solicitudes del cliente.
- Perfil del cliente y consulta de sus solicitudes.
- Mapa/listado de reportes, consulta de categorías y creación de reportes con
  evidencia opcional.

<<<<<<< HEAD
El backend debe permitir CORS desde el origen del frontend (`FRONTEND_URL` en
su `.env`). La API actual no autentica las rutas públicas de reportes ni ofrece
autenticación administrativa; por eso la interfaz no muestra operaciones
administrativas ni permite editar/eliminar reportes.
=======
## Área administrativa: autenticación con token Sanctum (Actividad 5.2)

Requiere la API con las rutas `/api/v1/admin/*` protegidas (`auth:sanctum`). Administrador de prueba:
`admin@civicamap.test` / `password123` (se crea con `php artisan db:seed`).

| URL (hash)              | Protección | Contenido |
|-------------------------|------------|-----------|
| `#/admin/login`         | Pública (si ya hay sesión redirige al dashboard) | Formulario correo + contraseña → `POST /admin/login` |
| `#/admin/dashboard`     | **Guard** (solo administrador) | Bienvenida personalizada e indicadores (`GET /admin/reportes`, `/admin/categorias`) |
| `#/admin/reportes`      | **Guard** | Lista de reportes con evidencias |
| `#/admin/reportes/{id}` | **Guard** | Detalle del reporte y galería de evidencias |

Archivos principales:

- `resources/js/services/sessionService.js` – sesión en `sessionStorage` (`civicamap_token`, `civicamap_user`), mensaje flash y redirección con `location.replace`.
- `resources/js/bootstrap.js` – **interceptores Axios**: inyectan `Authorization: Bearer <token>` en cada petición; ante **401** (y **403** en `/admin/*`) limpian la sesión y redirigen al login con un mensaje.
- `resources/js/services/authService.js` – login, validación del perfil (`/admin/perfil`) y logout (`POST /admin/logout` + limpieza).
- `resources/js/app.js` – `canActivate()` (guardia de rutas), vistas de login/dashboard/reportes admin y restauración de sesión al recargar.

Decisiones de diseño:

- Un 401/403 de `/login` no dispara el cierre de sesión (son credenciales incorrectas, no una sesión caída). Un 403 fuera de `/admin/*` (reglas de negocio del cliente) se muestra como error sin destruir la sesión.
- El logout siempre limpia el navegador, incluso si la API no responde; en ese caso informa que no se pudo confirmar la revocación.
- "Impedir volver atrás": el logout usa `location.replace` y, si se regresa con el historial, el guard bloquea la vista protegida y devuelve al login.

Pruebas manuales sugeridas: abrir `#/admin/dashboard` sin sesión; iniciar sesión; borrar `civicamap_token` en *Application → Session Storage* y recargar; revisar en *Network* el encabezado `Authorization`; cerrar sesión y comprobar que el token ya no existe en `personal_access_tokens`.

El backend debe permitir CORS desde el origen del frontend (`FRONTEND_URL` en
su `.env`). El sitio público solo lee reportes (`GET /reportes`); la consulta administrativa usa `/admin/reportes` con token. La interfaz no permite editar/eliminar reportes.
>>>>>>> origin/main
La configuración CORS del backend permite por defecto `http://localhost:5173`
y `http://127.0.0.1:5173`; si usas otro host o puerto, agrega su origen a
`FRONTEND_URL` y limpia la caché de configuración de Laravel.
