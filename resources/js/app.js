import './bootstrap';
import '../css/app.css';
import { getApiErrorMessage, RecursosService } from './services/recursosService.js';
<<<<<<< HEAD

const app = document.querySelector('#app');
const API = window.axios;
const TOKEN_KEY = 'civicamap_token';
let currentUser = null;
=======
import { AuthService } from './services/authService.js';
import { ADMIN_LOGIN_ROUTE, SessionService } from './services/sessionService.js';

const app = document.querySelector('#app');
const API = window.axios;
// Usuario CLIENTE autenticado (las vistas de cliente lo usan). La sesión administrativa se consulta con SessionService.isAdmin().
let currentUser = null;
const syncCurrentUser = () => {
    currentUser = SessionService.isAuthenticated() && !SessionService.isAdmin() ? SessionService.getUser() : null;
};
>>>>>>> origin/main
const IMAGE_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22 viewBox=%220 0 800 450%22%3E%3Crect width=%22800%22 height=%22450%22 fill=%22%23e9ecef%22/%3E%3Cpath d=%22M0 360l190-170 130 120 130-150 350 290H0z%22 fill=%22%23ced4da%22/%3E%3Ccircle cx=%22590%22 cy=%22125%22 r=%2240%22 fill=%22%23ced4da%22/%3E%3Ctext x=%22400%22 y=%22420%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2224%22 fill=%22%236c757d%22%3EImagen no disponible%3C/text%3E%3C/svg%3E';

const escapeHtml = (value = '') =>
    String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);

const route = () => {
    const path = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    return path || 'inicio';
};

const navigate = (path) => {
    window.location.hash = `/${path}`;
};

const envelopeData = (response) => response.data?.data;

const apiErrorMessage = getApiErrorMessage;

const alertBox = (message, type = 'danger') =>
    `<div class="alert alert-${type}" role="alert">${escapeHtml(message)}</div>`;

const bindImageFallbacks = (container) => {
    container.querySelectorAll('img[data-fallback]').forEach((image) => {
        image.onerror = () => {
            image.onerror = null;
            const imageLink = image.closest('a');
            if (imageLink) imageLink.href = IMAGE_PLACEHOLDER;
            image.src = IMAGE_PLACEHOLDER;
        };
    });
};

const loadingIndicator = (message) => `
    <div class="text-center py-5" role="status" aria-live="polite">
        <div class="spinner-border text-primary mb-3" aria-hidden="true"></div>
        <p class="text-secondary mb-0">${escapeHtml(message)}</p>
    </div>`;

const pageTitle = (eyebrow, title, description = '') => `
    <div class="text-center mb-4">
        <span class="badge text-bg-primary mb-2">${escapeHtml(eyebrow)}</span>
        <h1 class="fw-bold">${escapeHtml(title)}</h1>
        ${description ? `<p class="text-secondary">${escapeHtml(description)}</p>` : ''}
    </div>`;

<<<<<<< HEAD
const header = () => `
=======
const adminHeader = () => {
    const user = SessionService.getUser();
    const links = [
        ['admin/dashboard', 'bi-speedometer2', 'Dashboard'],
        ['admin/reportes', 'bi-file-earmark-text', 'Reportes'],
    ];

    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm" data-admin-navbar>
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#/admin/dashboard">
                <span class="brand-icon"><i class="bi bi-shield-lock-fill"></i></span>CivicaMap <span class="badge text-bg-warning ms-2">Admin</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menú">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav me-auto align-items-lg-center gap-lg-1">
                    ${links.map(([path, icon, label]) => `<li class="nav-item"><a class="nav-link${route() === path ? ' active' : ''}" href="#/${path}"><i class="bi ${icon} me-1"></i>${label}</a></li>`).join('')}
                    <li class="nav-item"><a class="nav-link" href="#/inicio"><i class="bi bi-box-arrow-up-right me-1"></i>Sitio público</a></li>
                </ul>
                <div class="d-flex flex-wrap align-items-center gap-2">
                    <span class="navbar-text text-white" data-admin-user>
                        <i class="bi bi-person-circle me-1"></i>${escapeHtml(user?.nombre || 'Administrador')}
                        <span class="badge text-bg-warning ms-1">${escapeHtml((user?.roles || []).join(', '))}</span>
                    </span>
                    <button class="btn btn-outline-light" data-action="logout"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button>
                </div>
            </div>
        </div>
    </nav>`;
};

const publicHeader = () => `
>>>>>>> origin/main
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#/inicio">
                <span class="brand-icon"><i class="bi bi-map-fill"></i></span>CivicaMap
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menú">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
                    <li class="nav-item"><a class="nav-link" href="#/mapa"><i class="bi bi-geo-alt me-1"></i>Reportes</a></li>
                    <li class="nav-item"><a class="nav-link" href="#/denuncias"><i class="bi bi-megaphone me-1"></i>Nuevo reporte</a></li>
                    <li class="nav-item"><a class="nav-link" href="#/servicios"><i class="bi bi-grid me-1"></i>Servicios</a></li>
<<<<<<< HEAD
                    ${currentUser ? `
=======
                    ${SessionService.isAdmin() ? `
                        <li class="nav-item"><a class="nav-link" href="#/admin/dashboard"><i class="bi bi-shield-lock me-1"></i>Panel administrativo</a></li>
                        <li class="nav-item ms-lg-2"><button class="btn btn-outline-light" data-action="logout"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button></li>
                    ` : currentUser ? `
>>>>>>> origin/main
                        <li class="nav-item"><a class="nav-link" href="#/perfil"><i class="bi bi-person me-1"></i>Mi perfil</a></li>
                        <li class="nav-item"><a class="nav-link" href="#/solicitudes"><i class="bi bi-card-checklist me-1"></i>Mis solicitudes</a></li>
                        <li class="nav-item ms-lg-2"><button class="btn btn-outline-light" data-action="logout"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button></li>
                    ` : `
                        <li class="nav-item ms-lg-2"><a class="btn btn-outline-light" href="#/login">Iniciar sesión</a></li>
                        <li class="nav-item ms-lg-2"><a class="nav-link" href="#/registro">Crear cuenta</a></li>
                    `}
                </ul>
            </div>
        </div>
    </nav>`;

<<<<<<< HEAD
=======
const isAdminArea = (name = route()) => name === 'admin' || name.startsWith('admin/');

const header = () => (SessionService.isAdmin() && isAdminArea() ? adminHeader() : publicHeader());

>>>>>>> origin/main
const footer = () => `
    <footer class="footer mt-5 py-4">
        <div class="container d-flex flex-wrap justify-content-between gap-2">
            <span><i class="bi bi-map-fill me-2"></i>CivicaMap</span>
<<<<<<< HEAD
            <span class="small">Proyecto académico · ODS 16</span>
=======
            <span class="small">Proyecto académico · ODS 16 · <a class="link-light" href="#/admin/login">Acceso administrativo</a></span>
>>>>>>> origin/main
        </div>
    </footer>`;

const layout = (content) => {
    app.innerHTML = `${header()}<main>${content}</main>${footer()}`;
    app.querySelector('[data-action="logout"]')?.addEventListener('click', logout);
};

const requestPage = (title, renderer) => async () => {
    layout(`<div class="container py-5">${pageTitle('CivicaMap', title)}<div id="page-content"><p class="text-center text-secondary">Cargando...</p></div></div>`);
    const container = app.querySelector('#page-content');

    try {
        await renderer(container);
    } catch (error) {
        container.innerHTML = alertBox(apiErrorMessage(error));
    }
};

const homePage = () => {
    layout(`
        <section class="hero py-5">
            <div class="container py-5">
                <div class="row align-items-center g-5">
                    <div class="col-lg-7">
                        <span class="badge bg-light text-primary mb-3 px-3 py-2">Participación ciudadana · ODS 16</span>
                        <h1 class="display-4 fw-bold">Reporta, consulta y participa en tu comunidad.</h1>
                        <p class="lead mt-3 mb-4">CivicaMap centraliza reportes ciudadanos y los presenta de forma clara para facilitar la comunicación y la toma de decisiones.</p>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="#/denuncias" class="btn btn-danger btn-lg"><i class="bi bi-megaphone me-2"></i>Realizar denuncia</a>
                            <a href="#/mapa" class="btn btn-light btn-lg"><i class="bi bi-map me-2"></i>Explorar reportes</a>
                        </div>
                    </div>
                    <div class="col-lg-5"><div class="hero-card p-4 shadow-lg">
                        <div class="d-flex align-items-center mb-3"><i class="bi bi-shield-check fs-1 me-3"></i><div><h4 class="mb-0">Tu reporte importa</h4><small>Información organizada para la comunidad</small></div></div>
                        <hr class="border-light opacity-50">
                        <div class="row g-3 text-center"><div class="col-4"><strong class="fs-3 d-block">24/7</strong><small>Acceso</small></div><div class="col-4"><strong class="fs-3 d-block">100%</strong><small>Enfoque ciudadano</small></div><div class="col-4"><strong class="fs-3 d-block"><i class="bi bi-eye-slash"></i></strong><small>Privacidad</small></div></div>
                    </div></div>
                </div>
            </div>
        </section>
        <section class="container py-5">
            <div class="text-center mb-5"><h2 class="section-title">Todo en un solo lugar</h2><p class="text-secondary">Consulta la información de la comunidad y participa.</p></div>
            <div class="row g-4">
                <div class="col-md-4"><div class="card shadow-sm h-100 p-4"><div class="feature-icon bg-primary-subtle text-primary mb-3"><i class="bi bi-map"></i></div><h4>Reportes ciudadanos</h4><p class="text-secondary">Consulta reportes por categoría y ubicación.</p><a href="#/mapa" class="btn btn-outline-primary mt-auto">Ver reportes</a></div></div>
                <div class="col-md-4"><div class="card shadow-sm h-100 p-4"><div class="feature-icon bg-danger-subtle text-danger mb-3"><i class="bi bi-megaphone"></i></div><h4>Denuncias</h4><p class="text-secondary">Envía información sobre situaciones de interés comunitario.</p><a href="#/denuncias" class="btn btn-outline-danger mt-auto">Reportar</a></div></div>
                <div class="col-md-4"><div class="card shadow-sm h-100 p-4"><div class="feature-icon bg-success-subtle text-success mb-3"><i class="bi bi-buildings"></i></div><h4>Servicios</h4><p class="text-secondary">Consulta servicios y envía solicitudes a la comunidad.</p><a href="#/servicios" class="btn btn-outline-success mt-auto">Consultar</a></div></div>
            </div>
        </section>`);
};

<<<<<<< HEAD
const reportCard = (report) => {
=======
const reportCard = (report, admin = false) => {
>>>>>>> origin/main
    const category = report.categoria?.nombre || 'Sin categoría';
    const author = report.anonimizado ? 'Anónimo' : (report.usuario?.nombre || 'No disponible');
    const image = report.evidencias?.[0]?.url;
    const coordinates = [report.latitud_aprox, report.longitud_aprox].filter((value) => value !== null && value !== undefined && value !== '').join(', ');

<<<<<<< HEAD
    return `<a class="resource-card-link" href="#/reportes/${encodeURIComponent(report.id_reporte)}" aria-label="Ver detalle del reporte ${escapeHtml(report.id_reporte)}">
=======
    return `<a class="resource-card-link" href="#/${admin ? 'admin/' : ''}reportes/${encodeURIComponent(report.id_reporte)}" aria-label="Ver detalle del reporte ${escapeHtml(report.id_reporte)}">
>>>>>>> origin/main
        <article class="card resource-card shadow-sm h-100">
            <img class="resource-card-image" data-fallback src="${escapeHtml(image || IMAGE_PLACEHOLDER)}" alt="${image ? `Evidencia del reporte ${escapeHtml(report.id_reporte)}` : 'Imagen no disponible'}" loading="lazy">
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between gap-2 mb-2">
                    <span class="badge text-bg-primary">${escapeHtml(category)}</span>
                    <span class="badge text-bg-light">${escapeHtml(report.estado || 'Sin estado')}</span>
                </div>
                <h2 class="h5">${escapeHtml(report.descripcion || `Reporte #${report.id_reporte}`)}</h2>
                <div class="small text-secondary mt-auto">
                    <div><i class="bi bi-person me-1"></i>${escapeHtml(author)}</div>
                    ${coordinates ? `<div><i class="bi bi-geo-alt me-1"></i>${escapeHtml(coordinates)}</div>` : ''}
                    <div><i class="bi bi-calendar me-1"></i>${escapeHtml(report.fecha_reporte || 'Fecha no disponible')}</div>
                </div>
                <span class="resource-card-action mt-3">Ver detalles <i class="bi bi-arrow-right"></i></span>
            </div>
        </article>
    </a>`;
};

<<<<<<< HEAD
const reportsPage = async () => {
    layout(`<div class="container py-5">${pageTitle('CivicaMap', 'Reportes ciudadanos', 'Consulta reportes de tu comunidad.') }<div id="page-content">${loadingIndicator('Cargando reportes...')}</div></div>`);
    const container = app.querySelector('#page-content');

    try {
        const reports = await RecursosService.getRecursos();
        let categories = [];
        try {
            const categoriesResponse = await API.get('/categorias');
            categories = envelopeData(categoriesResponse) || [];
=======
const reportsView = async (admin = false) => {
    const scope = admin ? 'admin' : 'public';
    layout(`<div class="container py-5">${admin
        ? pageTitle('Panel administrativo', 'Gestión de reportes', 'Reportes consultados con tu token de administrador.')
        : pageTitle('CivicaMap', 'Reportes ciudadanos', 'Consulta reportes de tu comunidad.')}<div id="page-content">${loadingIndicator('Cargando reportes...')}</div></div>`);
    const container = app.querySelector('#page-content');

    try {
        const reports = await RecursosService.getRecursos(scope);
        let categories = [];
        try {
            categories = (await RecursosService.getCategorias(scope)) || [];
>>>>>>> origin/main
        } catch (error) {
            console.error('No se pudieron cargar las categorías de reportes.', error);
        }

        if (!reports.length) {
            container.innerHTML = `<div class="empty-state"><i class="bi bi-inbox"></i><h2 class="h4">Aún no hay reportes</h2><p class="text-secondary mb-0">Cuando se registre un reporte, aparecerá aquí.</p></div>`;
            return;
        }

        container.innerHTML = `
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
<<<<<<< HEAD
                <p class="text-secondary mb-0">Reportes consultados desde la API.</p>
=======
                <p class="text-secondary mb-0">${admin ? 'Datos protegidos por auth:sanctum.' : 'Reportes consultados desde la API.'}</p>
>>>>>>> origin/main
                <select id="category-filter" class="form-select w-auto" aria-label="Filtrar por categoría">
                    <option value="">Todas las categorías</option>
                    ${categories.map((category) => `<option value="${escapeHtml(category.id_categoria)}">${escapeHtml(category.nombre)}</option>`).join('')}
                </select>
            </div>
            <div id="report-list" class="row g-4"></div>`;

        const list = container.querySelector('#report-list');
        const filter = container.querySelector('#category-filter');
        const renderReports = () => {
            const filtered = reports.filter((report) => !filter.value || String(report.id_categoria) === filter.value);
            list.innerHTML = filtered.length
<<<<<<< HEAD
                ? filtered.map((report) => `<div class="col-sm-6 col-xl-4">${reportCard(report)}</div>`).join('')
=======
                ? filtered.map((report) => `<div class="col-sm-6 col-xl-4">${reportCard(report, admin)}</div>`).join('')
>>>>>>> origin/main
                : '<div class="col-12"><div class="empty-state"><p class="text-secondary mb-0">No hay reportes en esta categoría.</p></div></div>';
            bindImageFallbacks(list);
        };

        filter.addEventListener('change', renderReports);
        renderReports();
    } catch (error) {
        container.innerHTML = alertBox(apiErrorMessage(error));
    }
};

<<<<<<< HEAD
const resourceDetailPage = async (id) => {
    layout(`<div class="container py-5"><a href="#/mapa" class="btn btn-link px-0 mb-3"><i class="bi bi-arrow-left me-1"></i>Volver a reportes</a><div id="page-content">${loadingIndicator('Cargando detalle del reporte...')}</div></div>`);
    const container = app.querySelector('#page-content');

    try {
        const report = await RecursosService.getRecursoById(id);
=======
const resourceDetailPage = async (id, admin = false) => {
    layout(`<div class="container py-5"><a href="${admin ? '#/admin/reportes' : '#/mapa'}" class="btn btn-link px-0 mb-3"><i class="bi bi-arrow-left me-1"></i>Volver a reportes</a><div id="page-content">${loadingIndicator('Cargando detalle del reporte...')}</div></div>`);
    const container = app.querySelector('#page-content');

    try {
        const report = await RecursosService.getRecursoById(id, admin ? 'admin' : 'public');
>>>>>>> origin/main
        const category = report.categoria?.nombre || 'Sin categoría';
        const author = report.anonimizado ? 'Anónimo' : (report.usuario?.nombre || 'No disponible');
        const coordinates = [report.latitud_aprox, report.longitud_aprox].filter((value) => value !== null && value !== undefined && value !== '').join(', ');
        const evidences = report.evidencias || [];
        const gallery = evidences.length
            ? evidences.map((evidence, index) => {
                const imageUrl = evidence.url || evidence.ruta_archivo || IMAGE_PLACEHOLDER;
                return `<a class="detail-gallery-item" href="${escapeHtml(imageUrl)}" target="_blank" rel="noopener noreferrer">
                    <img data-fallback src="${escapeHtml(imageUrl)}" alt="Evidencia ${index + 1} del reporte" loading="lazy">
                    <span>${escapeHtml(evidence.tipo_archivo || `Imagen ${index + 1}`)}</span>
                </a>`;
            }).join('')
            : `<img class="detail-main-image" data-fallback src="${IMAGE_PLACEHOLDER}" alt="Imagen no disponible">`;

        container.innerHTML = `
            <article class="detail-view">
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <span class="badge text-bg-primary">${escapeHtml(category)}</span>
                    <span class="badge text-bg-light">${escapeHtml(report.estado || 'Sin estado')}</span>
                </div>
                <h1 class="h2 mb-3">Reporte #${escapeHtml(report.id_reporte || id)}</h1>
                ${evidences.length ? `<div class="detail-gallery mb-4">${gallery}</div>` : `<div class="mb-4">${gallery}</div>`}
                <section class="card shadow-sm p-4">
                    <h2 class="h5">Descripción</h2>
                    <p class="mb-4">${escapeHtml(report.descripcion || 'Sin descripción disponible.')}</p>
                    <h2 class="h5">Información del reporte</h2>
                    <dl class="detail-metadata mb-0">
                        <div><dt>Categoría</dt><dd>${escapeHtml(category)}</dd></div>
                        ${report.categoria?.descripcion ? `<div><dt>Descripción de categoría</dt><dd>${escapeHtml(report.categoria.descripcion)}</dd></div>` : ''}
                        <div><dt>Estado</dt><dd>${escapeHtml(report.estado || 'Sin estado')}</dd></div>
                        <div><dt>Fecha</dt><dd>${escapeHtml(report.fecha_reporte || 'Fecha no disponible')}</dd></div>
                        <div><dt>Reportado por</dt><dd>${escapeHtml(author)}</dd></div>
                        ${coordinates ? `<div><dt>Coordenadas aproximadas</dt><dd>${escapeHtml(coordinates)}</dd></div>` : ''}
                        <div><dt>Evidencias</dt><dd>${evidences.length}</dd></div>
                    </dl>
                </section>
            </article>`;
        bindImageFallbacks(container);
    } catch (error) {
        container.innerHTML = alertBox(apiErrorMessage(error));
    }
};

const categoriesOptions = (categories) => categories.map((category) =>
    `<option value="${escapeHtml(category.id_categoria)}">${escapeHtml(category.nombre)}</option>`
).join('');

const reportFormPage = async () => {
    if (!currentUser) {
        layout(`<div class="container py-5"><div class="auth-card">${pageTitle('Nuevo reporte', 'Inicia sesión para reportar', 'El backend requiere identificar al usuario que registra el reporte.')}<div class="card shadow-sm p-4 text-center"><a class="btn btn-primary" href="#/login">Iniciar sesión</a></div></div></div>`);
        return;
    }

    layout(`<div class="container py-5"><div class="row justify-content-center"><div class="col-xl-9">${pageTitle('Nuevo reporte', 'Realizar una denuncia', 'Completa la información del caso. Evita incluir datos personales innecesarios.')}<div id="form-alert"></div><div class="card shadow-sm p-4 p-lg-5"><form id="report-form" novalidate>
        <div class="row g-3">
            <div class="col-md-6"><label for="id_categoria" class="form-label fw-semibold">Categoría</label><select id="id_categoria" name="id_categoria" class="form-select" required><option value="">Cargando categorías...</option></select></div>
            <div class="col-md-6"><label for="estado" class="form-label fw-semibold">Estado</label><input id="estado" class="form-control" value="Recibido" readonly></div>
            <div class="col-12"><label for="descripcion" class="form-label fw-semibold">Descripción</label><textarea id="descripcion" name="descripcion" class="form-control" rows="5" minlength="5" maxlength="2000" required placeholder="Describe la situación de manera clara y objetiva..."></textarea></div>
            <div class="col-md-6"><label for="latitud_aprox" class="form-label fw-semibold">Latitud aproximada (opcional)</label><input id="latitud_aprox" name="latitud_aprox" type="number" step="any" min="-90" max="90" class="form-control" placeholder="Ej. 20.6597"></div>
            <div class="col-md-6"><label for="longitud_aprox" class="form-label fw-semibold">Longitud aproximada (opcional)</label><input id="longitud_aprox" name="longitud_aprox" type="number" step="any" min="-180" max="180" class="form-control" placeholder="Ej. -103.3496"></div>
            <div class="col-12"><label for="fecha_reporte" class="form-label fw-semibold">Fecha y hora</label><input id="fecha_reporte" name="fecha_reporte" type="datetime-local" class="form-control" required></div>
            <div class="col-12"><div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="anonimizado" name="anonimizado" checked><label class="form-check-label" for="anonimizado"><strong>Tratar el reporte como anónimo</strong><br><small class="text-secondary">La interfaz no mostrará públicamente tu identidad.</small></label></div></div>
            <div class="col-12"><label for="evidencia" class="form-label fw-semibold">Evidencia (opcional)</label><input id="evidencia" name="evidencia" class="form-control" type="file" accept="image/jpeg,image/png,image/webp"><div class="form-text">JPG, PNG o WebP; máximo 2 MB.</div></div>
            <div class="col-12 d-flex justify-content-end gap-2 mt-4"><a href="#/inicio" class="btn btn-light">Cancelar</a><button type="submit" class="btn btn-danger"><i class="bi bi-send me-2"></i>Enviar reporte</button></div>
        </div></form></div></div></div></div>`);

    const form = app.querySelector('#report-form');
    const alert = app.querySelector('#form-alert');
    const categorySelect = form.elements.id_categoria;

    try {
        const response = await API.get('/categorias');
        const categories = (envelopeData(response) || []).filter((category) => category.estado !== false && category.estado !== 0);
        categorySelect.innerHTML = `<option value="">Selecciona una categoría</option>${categoriesOptions(categories)}`;
    } catch (error) {
        categorySelect.innerHTML = '<option value="">No se pudieron cargar las categorías</option>';
        alert.innerHTML = alertBox(apiErrorMessage(error));
    }

    form.elements.fecha_reporte.value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        alert.innerHTML = '';
        const payload = {
            id_usuario: currentUser.id,
            id_categoria: Number(form.elements.id_categoria.value),
            descripcion: form.elements.descripcion.value.trim(),
            latitud_aprox: form.elements.latitud_aprox.value || null,
            longitud_aprox: form.elements.longitud_aprox.value || null,
            fecha_reporte: new Date(form.elements.fecha_reporte.value).toISOString(),
            estado: 'Recibido',
            anonimizado: form.elements.anonimizado.checked,
        };

        try {
            const response = await API.post('/reportes', payload);
            const report = envelopeData(response);
            const image = form.elements.evidencia.files[0];

            if (image && report?.id_reporte) {
                const evidence = new FormData();
                evidence.append('id_reporte', report.id_reporte);
                evidence.append('archivo', image);
                try {
                    await API.post('/evidencias', evidence);
                } catch (error) {
                    alert.innerHTML = alertBox(`El reporte se guardó, pero no se pudo subir la evidencia. ${apiErrorMessage(error)}`, 'warning');
                    button.disabled = false;
                    return;
                }
            }

            alert.innerHTML = alertBox('Reporte enviado correctamente.', 'success');
            form.reset();
            navigate('mapa');
        } catch (error) {
            alert.innerHTML = alertBox(apiErrorMessage(error));
        } finally {
            button.disabled = false;
        }
    });
};

const servicesPage = requestPage('Servicios comunitarios', async (container) => {
    const response = await API.get('/client/catalogo');
    const services = envelopeData(response) || [];

    container.innerHTML = services.length ? `<div class="row g-4">
        ${services.map((service) => `<div class="col-md-6 col-xl-4"><article class="card shadow-sm h-100 p-4">
            <div class="feature-icon bg-success-subtle text-success mb-3"><i class="bi bi-buildings"></i></div>
            <span class="small text-uppercase text-secondary fw-semibold">${escapeHtml(service.tipo || 'Servicio')}</span>
            <h4 class="mt-1">${escapeHtml(service.nombre)}</h4><p class="text-secondary">${escapeHtml(service.descripcion || 'Sin descripción disponible.')}</p>
            <p class="fw-semibold">${Number(service.costo || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
            <button class="btn btn-outline-success mt-auto" data-request-service="${escapeHtml(service.id)}">Solicitar servicio</button>
        </article></div>`).join('')}
    </div>` : '<p class="text-secondary">No hay servicios disponibles en este momento.</p>';

    container.querySelectorAll('[data-request-service]').forEach((button) => {
        button.addEventListener('click', async () => {
            if (!currentUser) {
                navigate('login');
                return;
            }

            button.disabled = true;
            try {
                await API.post('/client/mis-registros', {
                    servicios: [{ id_servicio: Number(button.dataset.requestService), cantidad: 1 }],
                });
                button.textContent = 'Solicitud enviada';
                button.classList.replace('btn-outline-success', 'btn-success');
            } catch (error) {
                window.alert(apiErrorMessage(error));
                button.disabled = false;
            }
        });
    });
});

const authPage = (register = false) => {
<<<<<<< HEAD
=======
    const flash = register ? null : SessionService.consumeFlash();
>>>>>>> origin/main
    const title = register ? 'Crear cuenta' : 'Iniciar sesión';
    const fields = register ? `
        <div class="mb-3"><label for="nombre" class="form-label fw-semibold">Nombre</label><input id="nombre" name="nombre" type="text" class="form-control" maxlength="100" autocomplete="name" required></div>
        <div class="mb-3"><label for="correo" class="form-label fw-semibold">Correo electrónico</label><input id="correo" name="correo" type="email" class="form-control" maxlength="150" autocomplete="email" required></div>
        <div class="mb-3"><label for="password" class="form-label fw-semibold">Contraseña (mínimo 8 caracteres)</label><input id="password" name="password" type="password" class="form-control" minlength="8" maxlength="100" autocomplete="new-password" required></div>
        <div class="mb-4"><label for="password_confirmation" class="form-label fw-semibold">Confirmar contraseña</label><input id="password_confirmation" name="password_confirmation" type="password" class="form-control" minlength="8" autocomplete="new-password" required></div>
    ` : `
        <div class="mb-3"><label for="correo" class="form-label fw-semibold">Correo electrónico</label><input id="correo" name="correo" type="email" class="form-control form-control-lg" autocomplete="email" required></div>
        <div class="mb-4"><label for="password" class="form-label fw-semibold">Contraseña</label><input id="password" name="password" type="password" class="form-control form-control-lg" autocomplete="current-password" required></div>
    `;

    layout(`<div class="container py-5"><div class="auth-card"><div class="card shadow-sm p-4 p-lg-5">
        ${pageTitle(register ? 'Registro' : 'Cuenta', title, register ? 'Regístrate para participar en CivicaMap.' : 'Accede a tu cuenta de CivicaMap.')}
<<<<<<< HEAD
        <div id="auth-alert"></div><form id="auth-form">${fields}
=======
        <div id="auth-alert">${flash ? alertBox(flash.message, flash.type) : ''}</div><form id="auth-form">${fields}
>>>>>>> origin/main
            ${register ? '<div class="form-check mb-4"><input class="form-check-input" type="checkbox" id="privacy" required><label class="form-check-label" for="privacy">Acepto el uso responsable de la plataforma.</label></div>' : ''}
            <button type="submit" class="btn ${register ? 'btn-success' : 'btn-primary'} btn-lg w-100">${register ? 'Crear cuenta' : 'Iniciar sesión'}</button>
        </form>
        <div class="text-center mt-4">${register ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} <a href="#/${register ? 'login' : 'registro'}">${register ? 'Iniciar sesión' : 'Crear una cuenta'}</a></div>
    </div></div></div>`);

    app.querySelector('#auth-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const button = form.querySelector('button[type="submit"]');
        const alert = app.querySelector('#auth-alert');
        button.disabled = true;
        alert.innerHTML = '';

        try {
            if (register && form.elements.password.value !== form.elements.password_confirmation.value) {
                throw new Error('Las contraseñas no coinciden.');
            }

            const endpoint = register ? '/client/register' : '/client/login';
            const response = await API.post(endpoint, {
                ...(register ? { nombre: form.elements.nombre.value.trim() } : {}),
                correo: form.elements.correo.value.trim(),
                password: form.elements.password.value,
            });

            if (register) {
                alert.innerHTML = alertBox('Cuenta creada. Ya puedes iniciar sesión.', 'success');
                form.reset();
                return;
            }

            const data = envelopeData(response);
<<<<<<< HEAD
            sessionStorage.setItem(TOKEN_KEY, data.token);
            currentUser = data.usuario;
=======
            SessionService.save(data);
            syncCurrentUser();
>>>>>>> origin/main
            navigate('perfil');
        } catch (error) {
            alert.innerHTML = alertBox(apiErrorMessage(error));
        } finally {
            button.disabled = false;
        }
    });
};

const profilePage = async () => {
    if (!currentUser) {
        navigate('login');
        return;
    }

    layout(`<div class="container py-5"><div class="row justify-content-center"><div class="col-lg-8">
        ${pageTitle('Cuenta', 'Mi perfil', 'Consulta y actualiza tus datos.')}
        <div id="profile-alert"></div><div class="card shadow-sm p-4 p-lg-5"><form id="profile-form">
            <div class="mb-3"><label for="nombre" class="form-label fw-semibold">Nombre</label><input id="nombre" name="nombre" class="form-control" maxlength="100" required></div>
            <div class="mb-3"><label for="correo" class="form-label fw-semibold">Correo electrónico</label><input id="correo" name="correo" type="email" class="form-control" maxlength="150" required></div>
            <div class="mb-4"><label for="password" class="form-label fw-semibold">Nueva contraseña (opcional)</label><input id="password" name="password" type="password" class="form-control" minlength="8" maxlength="100" autocomplete="new-password"></div>
            <button class="btn btn-primary" type="submit">Guardar cambios</button>
        </form></div>
    </div></div></div>`);

    const form = app.querySelector('#profile-form');
    const alert = app.querySelector('#profile-alert');

    try {
        const response = await API.get('/client/perfil');
        currentUser = envelopeData(response);
<<<<<<< HEAD
=======
        SessionService.updateUser(currentUser);
>>>>>>> origin/main
        form.elements.nombre.value = currentUser.nombre || '';
        form.elements.correo.value = currentUser.correo || '';
    } catch (error) {
        alert.innerHTML = alertBox(apiErrorMessage(error));
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const payload = {
            nombre: form.elements.nombre.value.trim(),
            correo: form.elements.correo.value.trim(),
        };
        if (form.elements.password.value) payload.password = form.elements.password.value;

        try {
            const response = await API.patch('/client/perfil', payload);
            currentUser = envelopeData(response);
<<<<<<< HEAD
=======
            SessionService.updateUser(currentUser);
>>>>>>> origin/main
            form.elements.password.value = '';
            alert.innerHTML = alertBox('Perfil actualizado correctamente.', 'success');
        } catch (error) {
            alert.innerHTML = alertBox(apiErrorMessage(error));
        }
    });
};

const requestsPage = requestPage('Mis solicitudes', async (container) => {
    if (!currentUser) {
        navigate('login');
        return;
    }
    const response = await API.get('/client/mis-registros');
    const requests = envelopeData(response) || [];

    container.innerHTML = requests.length ? `<div class="row g-4">${requests.map((request) => `
        <div class="col-12"><article class="card shadow-sm p-4">
            <div class="d-flex flex-wrap justify-content-between gap-2"><h2 class="h5">Solicitud #${escapeHtml(request.id)}</h2><span class="badge text-bg-secondary">${escapeHtml(request.estado)}</span></div>
            <p class="small text-secondary">${escapeHtml(request.fecha_solicitud || '')}</p>
            <ul class="mb-3">${(request.detalles || []).map((detail) => `<li>${escapeHtml(detail.servicio || 'Servicio')} × ${escapeHtml(detail.cantidad)} — ${Number(detail.subtotal || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</li>`).join('')}</ul>
            ${request.observaciones ? `<p>${escapeHtml(request.observaciones)}</p>` : ''}
            <p class="fw-semibold">Total: ${Number(request.total || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
            ${String(request.estado).toLowerCase().includes('pendiente') ? `<button class="btn btn-outline-danger align-self-start" data-cancel-request="${escapeHtml(request.id)}">Cancelar solicitud</button>` : ''}
        </article></div>`).join('')}</div>` : '<div class="card shadow-sm p-4"><p class="text-secondary mb-0">Todavía no tienes solicitudes. <a href="#/servicios">Consulta los servicios disponibles</a>.</p></div>';

    container.querySelectorAll('[data-cancel-request]').forEach((button) => {
        button.addEventListener('click', async () => {
            if (!window.confirm('¿Cancelar esta solicitud?')) return;
            button.disabled = true;
            try {
                await API.delete(`/client/mis-registros/${encodeURIComponent(button.dataset.cancelRequest)}`);
                await requestsPage();
            } catch (error) {
                window.alert(apiErrorMessage(error));
                button.disabled = false;
            }
        });
    });
});

<<<<<<< HEAD
const logout = async () => {
    try {
        await API.post('/client/logout');
=======
// ---------------------------------------------------------------------------
// Área administrativa (Actividad 5.2)
// ---------------------------------------------------------------------------
const adminLoginPage = () => {
    const flash = SessionService.consumeFlash();

    layout(`<div class="container py-5"><div class="auth-card"><div class="card shadow-sm p-4 p-lg-5">
        <div class="text-center mb-4">
            <div class="feature-icon bg-primary-subtle text-primary mx-auto mb-3"><i class="bi bi-shield-lock"></i></div>
            <h1 class="h2 fw-bold">Acceso administrativo</h1>
            <p class="text-secondary">Inicia sesión con tu cuenta de administrador.</p>
        </div>
        <div id="auth-alert" role="status">${flash ? alertBox(flash.message, flash.type) : ''}</div>
        <form id="admin-login-form" novalidate>
            <div class="mb-3"><label for="correo" class="form-label fw-semibold">Correo electrónico</label><input id="correo" name="correo" type="email" class="form-control form-control-lg" maxlength="150" autocomplete="username" required autofocus></div>
            <div class="mb-4"><label for="password" class="form-label fw-semibold">Contraseña</label><input id="password" name="password" type="password" class="form-control form-control-lg" autocomplete="current-password" required></div>
            <button type="submit" class="btn btn-primary btn-lg w-100">Iniciar sesión</button>
        </form>
        <div class="text-center mt-4"><a href="#/inicio"><i class="bi bi-arrow-left me-1"></i>Volver al sitio público</a></div>
    </div></div></div>`);

    const form = app.querySelector('#admin-login-form');
    const alert = app.querySelector('#auth-alert');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        alert.innerHTML = '';

        try {
            const usuario = await AuthService.adminLogin(form.elements.correo.value.trim(), form.elements.password.value);
            SessionService.setFlash(`¡Bienvenido, ${usuario.nombre}! Sesión iniciada correctamente.`, 'success');
            SessionService.redirect('/admin/dashboard');
        } catch (error) {
            alert.innerHTML = alertBox(apiErrorMessage(error));
            form.elements.password.value = '';
            button.disabled = false;
        }
    });
};

const statCard = (icon, label, value, tone = 'primary') => `
    <div class="col-sm-6 col-xl-3"><div class="card shadow-sm h-100 p-4">
        <div class="feature-icon bg-${tone}-subtle text-${tone} mb-3"><i class="bi ${icon}"></i></div>
        <div class="display-6 fw-bold" data-stat="${escapeHtml(label)}">${escapeHtml(value)}</div>
        <div class="text-secondary">${escapeHtml(label)}</div>
    </div></div>`;

const adminDashboardPage = async () => {
    const user = SessionService.getUser();
    const flash = SessionService.consumeFlash();

    layout(`<div class="container py-5">
        ${flash ? alertBox(flash.message, flash.type) : ''}
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
                <span class="badge text-bg-primary mb-2">Panel administrativo</span>
                <h1 class="fw-bold mb-1" id="admin-welcome">Bienvenido, ${escapeHtml(user?.nombre || 'Administrador')}</h1>
                <p class="text-secondary mb-0"><i class="bi bi-envelope me-1"></i>${escapeHtml(user?.correo || '')}
                    <span class="badge text-bg-warning ms-2">${escapeHtml((user?.roles || []).join(', '))}</span></p>
            </div>
            <a class="btn btn-primary" href="#/admin/reportes"><i class="bi bi-file-earmark-text me-2"></i>Gestionar reportes</a>
        </div>
        <div id="page-content">${loadingIndicator('Cargando indicadores...')}</div>
    </div>`);
    const container = app.querySelector('#page-content');

    try {
        const [reports, categories] = await Promise.all([
            RecursosService.getRecursos('admin'),
            RecursosService.getCategorias('admin'),
        ]);
        const byStatus = reports.reduce((totals, report) => {
            const status = String(report.estado || 'sin estado').toLowerCase();
            totals[status] = (totals[status] || 0) + 1;
            return totals;
        }, {});
        const evidences = reports.reduce((total, report) => total + (report.evidencias?.length || 0), 0);

        container.innerHTML = `
            <div class="row g-4 mb-4">
                ${statCard('bi-file-earmark-text', 'Reportes', reports.length)}
                ${statCard('bi-tags', 'Categorías', categories.length, 'success')}
                ${statCard('bi-images', 'Evidencias', evidences, 'danger')}
                ${statCard('bi-hourglass-split', 'Pendientes', byStatus.pendiente || 0, 'warning')}
            </div>
            <div class="card shadow-sm p-4"><h2 class="h5">Reportes por estado</h2>
                ${Object.keys(byStatus).length
                    ? `<ul class="mb-0">${Object.entries(byStatus).map(([status, total]) => `<li class="text-capitalize">${escapeHtml(status)}: <strong>${total}</strong></li>`).join('')}</ul>`
                    : '<p class="text-secondary mb-0">Aún no hay reportes registrados.</p>'}
            </div>`;
    } catch (error) {
        container.innerHTML = alertBox(apiErrorMessage(error));
    }
};

const logout = async () => {
    // Sesión administrativa: POST /admin/logout (revoca el token), limpia sessionStorage y redirige al Login
    if (SessionService.isAdmin()) {
        await AuthService.adminLogout();
        return;
    }

    try {
        await API.post('/client/logout', null, { skipAuthHandler: true });
>>>>>>> origin/main
    } catch (error) {
        if (error.response?.status !== 401) {
            window.alert(apiErrorMessage(error));
            return;
        }
    }

<<<<<<< HEAD
    sessionStorage.removeItem(TOKEN_KEY);
=======
    SessionService.clear();
>>>>>>> origin/main
    currentUser = null;
    navigate('inicio');
};

<<<<<<< HEAD
const render = async () => {
    const currentRoute = route();

    try {
=======
/**
 * GUARDIA DE RUTAS (equivalente a CanActivate): se evalúa antes de pintar cualquier vista.
 * Devuelve true si la navegación puede continuar; si no, redirige y devuelve false.
 *  - Todo lo que cuelga de #/admin/... (excepto el login) exige sesión de administrador.
 *  - El login administrativo no se muestra a quien ya tiene sesión (va al dashboard).
 * El login no está protegido, por lo que nunca se generan bucles de redirección.
 */
const canActivate = (name) => {
    if (name === 'admin/login') {
        if (SessionService.isAdmin()) {
            SessionService.redirect('/admin/dashboard');
            return false;
        }
        return true;
    }

    if (isAdminArea(name) && !SessionService.isAdmin()) {
        // Resto de sesión incompleta (p. ej. token borrado a mano): se elimina por completo
        if (!SessionService.isAuthenticated()) SessionService.clear();
        if (!SessionService.hasFlash()) {
            SessionService.setFlash('Debes iniciar sesión como administrador para acceder a esa sección.', 'warning');
        }
        SessionService.redirect(ADMIN_LOGIN_ROUTE);
        return false;
    }

    return true;
};

const render = async () => {
    const currentRoute = route();
    syncCurrentUser();

    if (!canActivate(currentRoute)) return;

    try {
        const adminDetailMatch = currentRoute.match(/^admin\/reportes\/([^/]+)$/);
        if (adminDetailMatch) {
            await resourceDetailPage(decodeURIComponent(adminDetailMatch[1]), true);
            return;
        }

>>>>>>> origin/main
        const detailMatch = currentRoute.match(/^reportes\/([^/]+)$/);
        if (detailMatch) {
            await resourceDetailPage(decodeURIComponent(detailMatch[1]));
            return;
        }

        const pages = {
            inicio: homePage,
<<<<<<< HEAD
            mapa: reportsPage,
            reportes: reportsPage,
=======
            mapa: () => reportsView(false),
            reportes: () => reportsView(false),
            'admin/login': adminLoginPage,
            'admin/dashboard': adminDashboardPage,
            'admin/reportes': () => reportsView(true),
>>>>>>> origin/main
            denuncias: reportFormPage,
            servicios: servicesPage,
            login: () => authPage(false),
            registro: () => authPage(true),
            perfil: profilePage,
            solicitudes: requestsPage,
        };
<<<<<<< HEAD
        await (pages[currentRoute] || homePage)();
=======
        // Cualquier otra URL administrativa desconocida cae en el dashboard (ya validado por el guard)
        await (pages[currentRoute] || (isAdminArea(currentRoute) ? adminDashboardPage : homePage))();
>>>>>>> origin/main
    } catch (error) {
        layout(`<div class="container py-5">${alertBox(apiErrorMessage(error))}<a href="#/inicio" class="btn btn-primary">Volver al inicio</a></div>`);
    }
};

<<<<<<< HEAD
const restoreSession = async () => {
    if (!sessionStorage.getItem(TOKEN_KEY)) return;

    try {
        const response = await API.get('/client/perfil');
        currentUser = envelopeData(response);
    } catch (error) {
        if (error.response?.status === 401) {
            sessionStorage.removeItem(TOKEN_KEY);
=======
/**
 * Al cargar/recargar la página valida contra la API que el token guardado siga vigente.
 * Si el token falta, está vencido, fue revocado o alterado, la sesión se destruye y el
 * guard envía al Login cuando se intenta entrar al área administrativa.
 */
const restoreSession = async () => {
    if (!SessionService.getToken() || !SessionService.getUser()) {
        SessionService.clear();
        return;
    }

    try {
        if (SessionService.isAdmin()) {
            await AuthService.adminProfile();
        } else {
            const response = await API.get('/client/perfil', { skipAuthHandler: true });
            SessionService.updateUser(envelopeData(response));
        }
    } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            SessionService.clear();
            SessionService.setFlash('Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.', 'warning');
>>>>>>> origin/main
            return;
        }
        console.error('No se pudo verificar la sesión con la API.', error);
    }
};

window.addEventListener('hashchange', render);

restoreSession().finally(render);
