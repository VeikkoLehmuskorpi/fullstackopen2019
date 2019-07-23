import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createNew = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return response.data;
};

const update = async (blog, updatedFields, token) => {
  const blogObj = {
    ...blog,
    ...updatedFields,
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blogObj, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getAll,
  createNew,
  update,
};
