export const SuccessToast = ({ children }) => {
  return (
    <div className="border rounded-xl bg-green-200 p-4 border-green-600 text-xl text-black text-center">
      {children}
    </div>
  );
};
