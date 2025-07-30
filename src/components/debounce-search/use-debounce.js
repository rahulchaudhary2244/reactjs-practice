import { useRef } from 'react';

export const debounce = (cb, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

export const useDebounce = (cb) => {
  const debounceRef = useRef(debounce(cb, 3000));
  return debounceRef.current;
};
