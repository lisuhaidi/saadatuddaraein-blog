import api from "../api";

export async function getMe() {
  const res = await api.get('public/me')
  return res.data
}

export async function logout() {
  await api.post('public/logout')
  return res.data
}
