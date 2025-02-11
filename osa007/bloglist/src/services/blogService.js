import axios from 'axios';
import storage from './storageService';

const baseUrl = '/api/blogs';

const getConfit = () => ({
  headers : { Authorization: `Bearer ${storage.loadUser().token}` }
});


const getAll = () => {
  const request = axios.get(baseUrl, getConfit());
  return request.then(response => response.data);
};

const update = (id, newUpdatableData) => {
  const request = axios.put(`${baseUrl}/${id}`, newUpdatableData, getConfit());
  return request.then(response => response.data);
};

const create = async (newUpdatableData) => {
  const response = await axios.post(baseUrl, newUpdatableData, getConfit());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};

export default { getAll, create, update, remove };
