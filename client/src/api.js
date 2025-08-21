export const API = import.meta.env.VITE_API_URL || 'http://localhost:5555/api';
export const BASE_URL = API.endsWith('/api') ? API.slice(0, -4) : API;

export async function api(path, { method='GET', data, token, isForm=false }={}) {
  const headers = {};
  if (!isForm) headers['Content-Type']='application/json';
  if (token) headers['Authorization']=`Bearer ${token}`;
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: isForm ? data : data ? JSON.stringify(data) : undefined
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return res.json();
}