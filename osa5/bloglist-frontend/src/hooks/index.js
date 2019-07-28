import { useState } from 'react';
import axios from 'axios';

// useField
export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => setValue(target.value);

  const reset = () => setValue('');

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = endpoint => {
  const [resources, setResource] = useState([]);

  const headers = token => {
    return {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  };

  const resourceService = {
    getAll: async () => {
      const response = await axios.get(endpoint);

      setResource([...resources, ...response.data]);
    },
    create: async (obj, token) => {
      const response = await axios.post(endpoint, obj, headers(token));

      setResource([...resources, response.data]);
    },
    update: async (obj, updatedFields, token) => {
      const updatedObj = {
        ...obj,
        ...updatedFields,
      };

      console.log('obj', obj);
      console.log('updatedFields', updatedFields);
      console.log('updatedObj', updatedObj);

      const response = await axios.put(
        `${endpoint}/${obj.id}`,
        updatedObj,
        headers(token)
      );

      const updatedResource = response.data;

      updatedResource.user = {
        id: obj.user.id,
        name: obj.user.name,
        username: obj.user.username,
      };

      setResource([
        ...resources.filter(resource => resource.id !== updatedResource.id),
        updatedResource,
      ]);
    },
    remove: async ({ id }, token) => {
      await axios.delete(`${endpoint}/${id}`, headers(token));

      setResource(resources.filter(resource => resource.id !== id));
    },
  };

  return [resources, resourceService];
};
