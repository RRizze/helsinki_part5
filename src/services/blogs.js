import axios from 'axios';
const baseUrl = 'http://localhost:3002/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async ({ title, author, url }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, { title, author, url }, config);
  return res.data;
};

const update = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  blog.likes = blog.likes + 1;

  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res.data;
};

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
};
