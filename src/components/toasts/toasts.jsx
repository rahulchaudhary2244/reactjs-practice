import { useToastsApi, useToastsData } from './toasts-provider';

export const Toasts = () => {
  const { toasts } = useToastsData();
  const { removeToast } = useToastsApi();

  return (
    <div className="absolute bottom-9 right-9 flex gap-4 w-44 flex-col">
      {toasts.map(({ id, toast, enableRemove }) => (
        <div key={id} className="flex gap-2 items-center">
          {toast}
          {enableRemove && (
            <button
              className="font-bold text-2xl text-black cursor-pointer"
              onClick={() => removeToast(id)}
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
