import axios from 'axios';
<<<<<<< HEAD
=======
import {
    ADMIN_LOGIN_ROUTE,
    CLIENT_LOGIN_ROUTE,
    SessionService,
} from './services/sessionService.js';
>>>>>>> origin/main

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
    baseURL: apiBaseUrl.replace(/\/+$/, ''),
    timeout: 60000,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

window.axios = apiClient;

<<<<<<< HEAD
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('civicamap_token');
=======
/**
 * INTERCEPTOR DE PETICIÓN
 * Adjunta automáticamente "Authorization: Bearer <token>" a TODAS las peticiones
 * salientes hacia la API. Ningún servicio ni vista arma el encabezado a mano.
 * Al usar la instancia apiClient, el token solo viaja al origen de la API configurada.
 */
apiClient.interceptors.request.use((config) => {
    const token = SessionService.getToken();
>>>>>>> origin/main

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
<<<<<<< HEAD
=======

const SESSION_EXPIRED_MESSAGE = 'Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.';
const FORBIDDEN_MESSAGE = 'No tienes permisos para acceder a esa sección. Inicia sesión con una cuenta autorizada.';

const isLoginRequest = (url = '') => /\/login\/?$/.test(url);
const isAdminRequest = (url = '') => /^\/?admin(\/|$)/.test(url);
const hadToken = (config) => Boolean(config?.headers?.Authorization || config?.headers?.get?.('Authorization'));

let handlingSessionError = false;

/**
 * INTERCEPTOR DE RESPUESTA
 *  - 401 Unauthorized: token vencido, alterado, revocado o ausente.
 *  - 403 Forbidden en el área administrativa: token sin permisos de administrador.
 * En ambos casos: limpia la sesión, guarda un mensaje informativo y redirige al Login.
 *
 * Excepciones deliberadas:
 *  - /login: un 401/403 ahí significa "credenciales incorrectas / cuenta sin acceso",
 *    no una sesión caída; el formulario muestra el mensaje.
 *  - skipAuthHandler: peticiones (logout) que gestionan su propio resultado.
 *  - 403 del área de clientes (reglas de negocio, p. ej. solicitud ajena): se muestran
 *    como error normal sin destruir la sesión del cliente.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const { url = '', skipAuthHandler } = error.config ?? {};

        const sessionFailure =
            !skipAuthHandler &&
            !isLoginRequest(url) &&
            (status === 401 || (status === 403 && isAdminRequest(url)));

        if (sessionFailure && !handlingSessionError) {
            handlingSessionError = true;
            setTimeout(() => { handlingSessionError = false; }, 500); // peticiones paralelas: redirige una sola vez

            const wasAdmin = isAdminRequest(url) || SessionService.isAdmin();

            if (hadToken(error.config) || SessionService.getToken() || wasAdmin) {
                SessionService.clear();
                SessionService.setFlash(
                    status === 403 ? FORBIDDEN_MESSAGE : SESSION_EXPIRED_MESSAGE,
                    'warning'
                );
                SessionService.redirect(wasAdmin ? ADMIN_LOGIN_ROUTE : CLIENT_LOGIN_ROUTE);
            }
        }

        return Promise.reject(error);
    }
);
>>>>>>> origin/main
