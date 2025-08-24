import { useDeferredValue, useEffect, useState } from 'react';
import { sleep } from '../../lib/utils';
import { USERS } from './users';

export const DeferredHook = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // ✅ useDeferredValue tells React:
  // “this value can be low priority — update it later if needed”
  // So typing in the input (query) stays snappy, while deferredQuery may lag a bit.
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    (async () => {
      await sleep(3000); // simulate a slow API / expensive computation
      const filteredUsers = USERS.filter(({ name }) =>
        name.toLowerCase().includes(deferredQuery.toLocaleLowerCase())
      );
      setResults(filteredUsers);
    })();
  }, [deferredQuery]); // 🔑 triggers only when deferredQuery updates

  return (
    <div>
      <div className="border p-3">
        <label htmlFor="input">Search by name</label>
        <input
          id="input"
          className="p-3 border m-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="font-bold">Showing results for deferredQuery = {deferredQuery}</div>

      {results.length ? (
        results.map(({ id, name }) => <div key={id}>{name}</div>)
      ) : (
        <div>No search results, Please type something</div>
      )}
    </div>
  );
};
