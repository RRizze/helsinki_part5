import { useState, useEffect } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    clear,
  };
};

export const useLocalState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);

    return storageValue !== null ? JSON.parse(storageValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
