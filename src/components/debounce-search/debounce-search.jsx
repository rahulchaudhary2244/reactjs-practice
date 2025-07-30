import { useEffect, useState } from 'react';
import { useDebounce } from './use-debounce';

const API_URL = `https://dummyjson.com/users/search`;

export const DebounceSearch = () => {
  const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async (key) => {
    const response = await fetch(`${API_URL}?q=${key}`);
    const data = await response.json();
    setUsers(data.users);
  };

  const debounceFetch = useDebounce(fetchUsers);

  useEffect(() => {
    debounceFetch(searchKey);
  }, [searchKey]);

  const onChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <input type="text" className="w-52 h-8 border" onChange={onChange} value={searchKey} />
      <ul>
        {users.map(({ id, firstName, lastName }) => (
          <li key={id}>{`${id} ${firstName} ${lastName}`}</li>
        ))}
      </ul>
    </div>
  );
};
