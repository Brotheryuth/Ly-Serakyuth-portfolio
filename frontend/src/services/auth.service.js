import api from './api'

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password});
    return res.data.token;
  },
  logout: async () => {
    localStorage.removeItem('token');
    window.location.href ='/login'
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
    
}