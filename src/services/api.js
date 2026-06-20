import axios from 'axios';

/**
 * Cliente HTTP del portal público.
 *
 * Por defecto apunta al backend desplegado. En desarrollo se sobrescribe con
 * VITE_API_URL en .env.local (por ejemplo http://localhost:5001).
 *
 * Timeout configurado a 45s para tolerar:
 *   - Cold start de Vercel (5-10s)
 *   - Generación de PDF con descarga de logos remotos (3-5s)
 *   - Latencia de red móvil en zonas con cobertura intermitente
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://imcufideem-mus-backend.vercel.app',
  timeout: 45000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Retry automático ante errores de red o timeout — frecuentes durante el
 * primer hit a un Lambda en frío. Reintenta hasta 2 veces con backoff lineal.
 *
 * NO reintenta:
 *   - Respuestas con código HTTP (5xx incluidos) — esas son del backend, no
 *     errores de transporte
 *   - Requests OPTIONS (preflight CORS)
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};
    config.__retryCount = config.__retryCount || 0;

    const isRetryable =
      !error.response &&
      (error.code === 'ECONNABORTED' ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('timeout') ||
        error.message?.includes('Network Error'));

    if (isRetryable && config.__retryCount < 2 && config.method !== 'options') {
      config.__retryCount += 1;
      // Backoff: 1.5s, 3s
      await new Promise((r) => setTimeout(r, 1500 * config.__retryCount));
      return api.request(config);
    }
    return Promise.reject(error);
  },
);

export default api;

/**
 * Warm-up: pinguea el endpoint /health para despertar el Lambda en frío
 * sin bloquear nada. Si falla, no pasa nada — es best-effort.
 *
 * Se llama al cargar el portal (desde main.jsx). Cuando el ciudadano va a
 * hacer su consulta, el Lambda ya está despierto.
 */
export const warmupBackend = () => {
  api
    .get('/health', { timeout: 8000 })
    .catch(() => {
      // silencioso — solo es pre-calentamiento
    });
};

/**
 * Consulta de referencias para el socio.
 * Requiere matrícula y fecha de nacimiento exacta.
 */
export const lookupReferences = async ({ matricula, dateOfBirth }) => {
  const { data } = await api.post('/api/public/references/lookup', {
    matricula: matricula.trim().toUpperCase(),
    dateOfBirth,
  });
  return data;
};

/**
 * Descarga del PDF de la ficha bancaria para pagar.
 * Disponible para referencias PENDING y PARTIAL.
 */
export const downloadReferencePdf = async ({ id, matricula, dateOfBirth }) => {
  const res = await api.post(`/api/public/references/${id}/pdf`, {
    matricula: matricula.trim().toUpperCase(),
    dateOfBirth,
  }, { responseType: 'blob' });
  return res.data;
};

/**
 * Descarga del recibo oficial de pago.
 * Sólo disponible cuando la referencia está totalmente pagada (status PAID).
 */
export const downloadReferenceReceipt = async ({ id, matricula, dateOfBirth }) => {
  const res = await api.post(`/api/public/references/${id}/receipt`, {
    matricula: matricula.trim().toUpperCase(),
    dateOfBirth,
  }, { responseType: 'blob' });
  return res.data;
};
