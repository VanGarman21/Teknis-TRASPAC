import axios from 'axios'
import { api, ensureCsrf, API_BASE_URL } from './api'
import type { User } from './types'

export async function login(username: string, password: string): Promise<User> {
  await ensureCsrf()
  const { data } = await axios.post(`${API_BASE_URL}/login`, { username, password }, { withCredentials: true })
  return data.user
}

export async function me(): Promise<User | null> {
  try {
    const { data } = await api.get('/me')
    return data.user
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true })
}


