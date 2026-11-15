/**
 * Gestión de la sesión del navegador (Actividad 5.2).
 *
 * Se usa sessionStorage: la sesión vive solo en la pestaña actual y desaparece
 * al cerrarla, lo que reduce la ventana de exposición del token frente a localStorage.
 * Claves almacenadas:
 *   civicamap_token -> Bearer token de Sanctum
 *   civicamap_user  -> perfil del usuario autenticado (id, nombre, correo, roles)
 *   civicamap_flash -> mensaje informativo de un solo uso (se muestra en la pantalla de Login)
 */
const TOKEN_KEY = 'civicamap_token';
const USER_KEY = 'civicamap_user';
const FLASH_KEY = 'civicamap_flash';

export const ADMIN_ROLE = 'Administrador';
export const ADMIN_LOGIN_ROUTE = '/admin/login';
export const CLIENT_LOGIN_ROUTE = '/login';

const safeParse = (value) => {
    try {
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
};

export const SessionService = {
    getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    },

    getUser() {
        return safeParse(sessionStorage.getItem(USER_KEY));
    },

    /** Guarda token y perfil devueltos por el endpoint de login. */
    save({ token, usuario }) {
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(usuario));
    },

    updateUser(usuario) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(usuario));
    },

    /** Elimina por completo los datos de sesión (no toca el mensaje flash). */
    clear() {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
    },

    /** Hay sesión solo si existen token Y perfil; una sesión a medias se considera inválida. */
    isAuthenticated() {
        return Boolean(this.getToken() && this.getUser());
    },

    hasRole(role) {
        const roles = this.getUser()?.roles;
        return Array.isArray(roles) && roles.includes(role);
    },

    isAdmin() {
        return this.isAuthenticated() && this.hasRole(ADMIN_ROLE);
    },

    setFlash(message, type = 'info') {
        sessionStorage.setItem(FLASH_KEY, JSON.stringify({ message, type }));
    },

    hasFlash() {
        return sessionStorage.getItem(FLASH_KEY) !== null;
    },

    /** Devuelve el mensaje flash y lo borra (se muestra una sola vez). */
    consumeFlash() {
        const flash = safeParse(sessionStorage.getItem(FLASH_KEY));
        sessionStorage.removeItem(FLASH_KEY);
        return flash;
    },

    /**
     * Redirige reemplazando la entrada actual del historial (replace), de modo que
     * el botón "Atrás" no regrese a la vista protegida. Si el hash ya es el destino
     * se fuerza el re-render, porque el navegador no emitiría hashchange.
     */
    redirect(route) {
        const target = `#${route}`;
        if (window.location.hash === target) {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
            return;
        }
        window.location.replace(target);
    },
};
