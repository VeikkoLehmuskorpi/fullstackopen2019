import axios from 'axios';

const baseUrl = '/api/blogs';

const headers = token => {
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

// getAll
const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

// createNew
const createNew = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, headers(token));

  return response.data;
};

// update
const update = async (blog, updatedFields, token) => {
  const blogObj = {
    ...blog,
    ...updatedFields,
  };

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    blogObj,
    headers(token)
  );

  return response.data;
};

// remove
const remove = async (blog, token) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, headers(token));

  return response.data;
};

// comment
const comment = async (blogId, blogComment, token) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}`,
    { blogComment },
    headers(token)
  );

  return response.data;
};

export default {
  getAll,
  createNew,
  update,
  remove,
  comment,
};
