import axios from 'axios'

export const API_BASE_URL = 'http://localhost:8000'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
})

export async function ensureCsrf() {
  await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true })
}

// Ensure CSRF cookie exists before unsafe methods (POST/PUT/PATCH/DELETE)
let csrfPromise: Promise<void> | null = null
async function ensureCsrfOnce() {
  if (!csrfPromise) {
    csrfPromise = ensureCsrf()
  }
  return csrfPromise
}

api.interceptors.request.use(async (config) => {
  const method = (config.method || 'get').toLowerCase()
  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    await ensureCsrfOnce()
  }
  return config
})

