import axios from 'axios';
import { getUser } from './localStorage';
const baseUrl = 'http://localhost:3002/api/blogs';

const getToken = () => {
  return `Bearer ${getUser().token}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getBlogById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const create = async ({ title, author, url }) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };
  const res = await axios.post(baseUrl, { title, author, url }, config);
  return res.data;
};

const update = async (updatedBlog) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };

  try {
    const res = await axios.put(
      `${baseUrl}/${updatedBlog.id}`,
      updatedBlog,
      config
    );
    return res.data;
  } catch (err) {}
};

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const addComment = async (blogId, comment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, { comment });
  return res.data.comment;
};

export default {
  getAll,
  create,
  update,
  remove,
  getBlogById,
  addComment,
};
