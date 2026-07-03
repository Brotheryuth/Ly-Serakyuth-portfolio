import api from './api'

export const projectService = {
  getAllProject: async () => {
    const res = await api.get('/project');
    return res.data.project;
  },
  getProjectByID : async (id) => {
    const res = await api.get(`/project/${id}`);
    return res.data.project;
  },
  updateProject: async (id, data) => {
    const res = await api.put(`/project/${id}`, data);
    return res.data.project;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/project/${id}`);
    return res.data;
  },
  createProject: async (data) => {
    const res = await api.post('/project', data);
    return res.data.project;
  }
}