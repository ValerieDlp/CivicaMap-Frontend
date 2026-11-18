import { apiClient } from '../bootstrap.js';
import { ADMIN_LOGIN_ROUTE, ADMIN_ROLE, SessionService } from './sessionService.js';

export const AuthService = {
    /**
     * POST /admin/login. Si la API responde 200 guarda token y perfil en la sesión.
     * Los errores (401 credenciales, 403 cuenta sin rol, 422 validación) se propagan al llamador.
     */
    async adminLogin(correo, password) {
        const response = await apiClient.post('/admin/login', { correo, password });
        const data = response.data?.data;

        if (!data?.token || !data?.usuario?.roles?.includes(ADMIN_ROLE)) {
            throw new Error('La respuesta de la API no corresponde a un administrador.');
        }

        SessionService.save(data);
        return data.usuario;
    },

    /** GET /admin/perfil: valida contra el servidor que el token guardado siga vigente. */
    async adminProfile() {
        // skipAuthHandler: quien llama (restoreSession) decide cómo reaccionar ante un 401/403
        const response = await apiClient.get('/admin/perfil', { skipAuthHandler: true });
        const usuario = response.data?.data;
        SessionService.updateUser(usuario);
        return usuario;
    },

    /**
     * POST /admin/logout: revoca el token en la base de datos de Laravel y después
     * limpia la sesión local SIEMPRE (aunque el servidor no haya respondido).
     * Devuelve { revoked } para informar si la revocación en el servidor se confirmó.
     */
    async adminLogout() {
        let revoked = true;

        try {
            // skipAuthHandler: el interceptor no debe tratar un 401 del logout como "sesión expirada"
            await apiClient.post('/admin/logout', null, { skipAuthHandler: true });
        } catch (error) {
            // 401 = el token ya no existía en el servidor (ya estaba revocado/vencido)
            revoked = error.response?.status === 401;
        }

        SessionService.clear();
        SessionService.setFlash(
            revoked
                ? 'Sesión cerrada correctamente. El token fue revocado.'
                : 'Se cerró la sesión en este navegador, pero no se pudo confirmar la revocación del token en el servidor.',
            revoked ? 'success' : 'warning'
        );
        SessionService.redirect(ADMIN_LOGIN_ROUTE);
        return { revoked };
    },
};
