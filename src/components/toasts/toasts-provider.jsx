import { createContext, use, useRef, useState } from 'react';

const ToastsDataContext = createContext(undefined);

const ToastsApiContext = createContext(undefined);

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  return (
    <ToastsDataContext.Provider value={toasts}>
      <ToastsApiContext.Provider value={setToasts}>{children}</ToastsApiContext.Provider>
    </ToastsDataContext.Provider>
  );
};

export const useToastsData = () => {
  const toasts = use(ToastsDataContext);

  if (toasts === undefined) throw new Error('useToastsData must be used within ToastsProvider');

  return { toasts };
};

export const useToastsApi = () => {
  const setToasts = use(ToastsApiContext);

  if (setToasts === undefined) throw new Error('useToastsApi must be used within ToastsProvider');

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (newToast, { enableRemove = false, delay = 3000 }) => {
    const id = getUniqueId();
    setTimeout(() => removeToast(id), delay);
    setToasts((prev) => [...prev, { toast: newToast, id, enableRemove, delay }]);
  };

  return { addToast, removeToast };
};

const getUniqueId = () => {
  return new Date().getTime().toString() + performance.now();
};
