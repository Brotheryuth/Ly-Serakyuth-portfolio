import api from './api'

export const educationService = {
  getAll: async () => {
    const res = await api.get('/education');
    return res.data.education;
  },
  updateEducation: async (id, data) => {
    const res = await api.put(`/education/${id}`, data);
    return res.data.education;
  },
  deleteEducation: async (id) => {
    const res = await api.delete(`/education/${id}`);
    return res.data;
  }
}