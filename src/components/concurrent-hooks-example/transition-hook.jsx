import { useState, useTransition } from 'react';
import { USERS } from './users';
import { sleep } from '../../lib/utils';

export const TransitionHook = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value); // urgent change (to be instant)

    // non-urgent update (can be delayed if react is busy)
    startTransition(async () => {
      await sleep(3000);
      const filteredUsers = USERS.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredUsers);
    });
  };

  return (
    <div>
      <div className="border p-3">
        <label htmlFor="input">Search by name</label>
        <input id="input" className="p-3 border m-3" value={query} onChange={handleChange} />
      </div>

      {isPending ? (
        <div>Loading...</div>
      ) : results.length ? (
        results.map(({ id, name }) => <div key={id}>{name}</div>)
      ) : (
        <div>No search results, Please type something</div>
      )}
    </div>
  );
};
