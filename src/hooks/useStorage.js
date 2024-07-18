import { useState } from 'react';

const useStorage = (init, key) => {
  const storage = sessionStorage;
  
  const stored = storage.getItem(key);
  if (stored !== null) {
    init = JSON.parse(stored);
  }

  const [value, setter] = useState(init);

  const wrappedSetter = (newValue) => {
    storage.setItem(key, JSON.stringify(newValue));
    setter(newValue);
  };

  return [value, wrappedSetter];
};

export default useStorage;