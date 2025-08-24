import { useState, useTransition } from 'react';
import { fetchUsers } from './utils';

export const TransitionHook = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value); // urgent change (to be instant)

    // non-urgent update (can be delayed if react is busy)
    startTransition(async () => {
      const users = await fetchUsers();
      const filteredUsers = users.filter(({ name, username, email, website }) => {
        return [name, username, email, website].some((x) =>
          x.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(filteredUsers);
    });
  };

  return (
    <div>
      <p>
        API ={' '}
        <a
          className="underline text-blue-500"
          href="https://jsonplaceholder.typicode.com/users"
          target="_blank"
        >
          https://jsonplaceholder.typicode.com/users
        </a>
      </p>

      <label htmlFor="input">Search by name, username, email, website</label>
      <input id="input" className="p-3 border m-3" value={query} onChange={handleChange} />

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
