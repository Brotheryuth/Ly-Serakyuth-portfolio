import api from './api'
export const skillService = {
  getAll: async () => {
    const res = await api.get('/userSkill');
    return res.data.skill;
  },
  addSkill: async (skillArr) => {
    const res = await api.post('/userSkill', skillArr);
    return res.data.skill;
  },
  updateSkill: async (id, data) => {
    const res = await api.put(`/userSkill/${id}`, data);
    return res.data.skill;
  },
  deleteSkill: async (id) => {
    const res = await api.delete(`/userSkill/${id}`);
    return res.data;
  }
}