import { apiClient } from '../bootstrap.js';

const storageOrigin = new URL(apiClient.defaults.baseURL).origin;
const imageField = /(?:imagen|image|foto|galeria|evidencia|ruta_archivo|^url$)/i;

const publicStorageUrl = (path) => {
    if (typeof path !== 'string' || !path.trim()) {
        return path;
    }

    const normalizedPath = path.trim();
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(normalizedPath)) {
        return normalizedPath;
    }

    const storagePath = normalizedPath.replace(/^\/+/, '').replace(/^storage\//i, '');
    return `${storageOrigin}/storage/${storagePath}`;
};

const normalizeImages = (value) => {
    if (Array.isArray(value)) {
        return value.map(normalizeImages);
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                imageField.test(key) && typeof item === 'string'
                    ? publicStorageUrl(item)
                    : normalizeImages(item),
            ])
        );
    }

    return value;
};

export const getApiErrorMessage = (error) => {
    if (error?.isApiRequestError) {
        return error.message;
    }

    if (error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT') {
        return 'La API tardó más de 60 segundos en responder. Verifica que el backend y su base de datos estén activos antes de volver a intentarlo.';
    }

    if (error?.code === 'ERR_NETWORK' || (!error?.response && error?.request)) {
        return 'No se pudo alcanzar la API. Verifica que el backend esté iniciado y que VITE_API_BASE_URL apunte a su dirección.';
    }

    const status = error?.response?.status ?? error?.status;
    const response = error?.response?.data;
    const validationErrors = response?.errors;
    const details = validationErrors && typeof validationErrors === 'object'
        ? Object.values(validationErrors).flat().join(' ')
        : '';

    if (status === 404) {
        return response?.message || 'El recurso solicitado no existe (404).';
    }

    if (status >= 500) {
        return response?.message || `El servidor encontró un error (${status}). Inténtalo de nuevo más tarde.`;
    }

    return [response?.message, details].filter(Boolean).join(' ') ||
        error?.message ||
        'No fue posible comunicarse con la API.';
};

const requestData = async (request) => {
    try {
        const response = await request;
        return normalizeImages(response.data?.data);
    } catch (error) {
        const requestError = new Error(getApiErrorMessage(error));
        requestError.status = error.response?.status;
        requestError.isApiRequestError = true;
        throw requestError;
    }
};

export const RecursosService = {
    async getRecursos() {
        return requestData(apiClient.get('/reportes'));
    },

    async getRecursoById(id) {
        if (id === undefined || id === null || id === '') {
            throw new TypeError('Se requiere el identificador del reporte.');
        }

        return requestData(apiClient.get(`/reportes/${encodeURIComponent(id)}`));
    },
};
