import axios from 'axios';
const baseEndpoint = '/api/persons';

const getAllContacts = async () => {
  const request = axios.get(baseEndpoint);
  const response = await request;
  return response.data;
};

const addContact = async personObj => {
  const request = axios.post(baseEndpoint, personObj);
  const response = await request;
  return response.data;
};

const deleteContact = async personId => {
  const request = axios.delete(`${baseEndpoint}/${personId}`);
  const response = await request;
  return response.data;
};

const updateContact = async (personId, personObj) => {
  const request = axios.put(`${baseEndpoint}/${personId}`, personObj);
  const response = await request;
  return response.data;
};

export default {
  getAllContacts,
  addContact,
  deleteContact,
  updateContact
};
