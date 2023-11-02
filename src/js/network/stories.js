import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';
import ApiEndpoint from '../config/api-endpoint';

const api = axios.create({
  baseURL: ApiEndpoint.BASE_URL,
  headers: {
    Authorization: `Bearer ${Utils.ambilUserToken(Config.USER_TOKEN_KEY)}`,
    'Content-Type': 'multipart/form-data',
  },
});

const Stories = {
  async getAll() {
    return await api.get(ApiEndpoint.GET_ALL_STORIES);
  },

  async getById(id) {
    return await api.get(ApiEndpoint.GET_BY_ID_STORIES(id));
  },

  async listStories({ description, photo }) {
    const data = { description, photo };
    return await api.post(ApiEndpoint.LIST_STORIES, data);
  },

  async update({ id, name, description, photoUrl, createdAt, lat, lon }) {
    const data = { name, description, photoUrl, createdAt, lat, lon };
    return await api.put(ApiEndpoint.UPDATE_STORIES(id), data);
  },

  async delete(id) {
    return await api.delete(ApiEndpoint.DELETE_STORIES(id));
  },
};

export default Stories;
