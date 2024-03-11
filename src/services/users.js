import axios from 'axios';

const baseUrl = 'http://localhost:3002/api/users';

const getUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getUserById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default {
  getUsers,
  getUserById,
};
