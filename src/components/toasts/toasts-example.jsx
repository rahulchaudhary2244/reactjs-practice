import { useState } from 'react';
import { Toasts } from './toasts';
import { ToastsProvider, useToastsApi } from './toasts-provider';
import { SuccessToast } from './success-toast';

export const ToastsExample = () => {
  return (
    <ToastsProvider>
      <Toasts />
      <SomeComponent />
    </ToastsProvider>
  );
};

const SomeComponent = () => {
  const { addToast } = useToastsApi();
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    addToast(<SuccessToast>Some toast message {clickCount}</SuccessToast>, {
      enableRemove: clickCount % 2 === 0,
      delay: clickCount % 2 ? 1000 : 5000,
    });
  };

  return (
    <button className="border p-4 border-black cursor-pointer" onClick={handleClick}>
      add toast
    </button>
  );
};
