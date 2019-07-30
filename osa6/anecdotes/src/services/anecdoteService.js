import axios from 'axios';

const baseUrl = 'http://localhost:3003/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async content => {
  const anecdoteObj = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const update = async ({ content, votes, id }) => {
  const anecdoteObj = { content, id, votes: votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteObj);
  return response.data;
};

export default {
  getAll,
  createNew,
  update,
};
