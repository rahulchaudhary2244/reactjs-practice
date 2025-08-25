import { startTransition, useOptimistic, useState } from 'react';
import { sleep } from '../../lib/utils';

export const OptimisticHook = () => {
  const [name, setName] = useState('');

  const onUpdate = async (newName) => {
    const confirmedName = await fakeApiCall(newName);
    startTransition(() => {
      setName(confirmedName);
    });
  };

  return <NameForm name={name} onUpdate={onUpdate} />;
};

const NameForm = ({ name, onUpdate }) => {
  const [optimisticName, setOptimisticName] = useOptimistic(name, (state, newName) => newName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newName = formData.get('user-name');

    // 🚀 Immediate optimistic update
    setOptimisticName(newName);
    form.reset();

    // ⏳ Async transition (works in React 19)
    startTransition(async () => {
      onUpdate(newName);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 m-3">
        <input name="user-name" className="border p-2" placeholder="Enter new name" />
        <button type="submit" className="cursor-pointer border p-1">
          Change name
        </button>
      </form>

      <p>Your name is: {optimisticName}</p>
    </>
  );
};

async function fakeApiCall(newName) {
  // Simulate slow server response
  await sleep(3000);
  return newName.toUpperCase(); // server "transforms" the name
}
