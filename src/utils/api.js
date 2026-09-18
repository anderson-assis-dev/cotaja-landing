// Aceita a URL com ou sem "/api" no fim: as rotas já incluem o prefixo.
export const API_URL = (process.env.REACT_APP_API_URL || 'https://app.cotaja.io')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '');

export const REF_STORAGE_KEY = 'cotaja_ref';

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  const json = await res.json();
  return json?.success ? json.data : null;
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}
