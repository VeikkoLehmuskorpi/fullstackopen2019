import { useState } from 'react';

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
