import api from './api'
export const userService = {
  
  getProfile: async () => {
    const res = await api.get('/user');
    return res; data.user[0] || null;
  },
  updateProject: async (id,profileData) => {
    const res = await api.put(`/user/${id}`, profileData);
    return res.data.user;
  }
}