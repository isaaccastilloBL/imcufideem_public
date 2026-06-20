import axios from 'axios';

/**
 * Cliente HTTP del portal público.
 *
 * Por defecto apunta al backend desplegado. En desarrollo se sobrescribe con
 * VITE_API_URL en .env.local (por ejemplo http://localhost:5001).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://imcufideem-mus-backend.vercel.app',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;

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
