import api from './api'

export const messageService = {
  getAllMessage: async () => {
    const res = await api.get('/message');
    return res.data.data;
  },
  addMessage: async (messageData) => {
    const res = await api.post('/message', messageData);
    return res.data.data;
  }
}