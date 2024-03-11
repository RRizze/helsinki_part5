import axios from 'axios';
const baseUrl = 'http://localhost:3002/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
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
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, { title, author, url }, config);
  return res.data;
};

const update = async (updatedBlog) => {
  const config = {
    headers: {
      Authorization: token,
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
      Authorization: token,
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
  setToken,
  create,
  update,
  remove,
  getBlogById,
  addComment,
};
