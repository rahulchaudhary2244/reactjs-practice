import { useState } from 'react';

const DATA = [
  {
    id: 'fruits',
    children: [{ id: 'apple' }, { id: 'citrus', children: [{ id: 'orange' }, { id: 'lemon' }] }],
  },
  {
    id: 'vegies',
    children: [
      {
        id: 'leafy',
        children: [{ id: 'spinach' }, { id: 'lattuce' }],
      },
    ],
  },
  {
    id: 'papaya',
  },
];

export const NestedCheckboxes = ({ data = DATA }) => {
  const [checked, setChecked] = useState(new Set());

  const getAllChildIds = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const { id, children } = data[i];
      result.push(id);
      if (children) {
        result.push(...getAllChildIds(children));
      }
    }
    return result;
  };

  const getNodeById = (key, data) => {
    for (let i = 0; i < data.length; i++) {
      const { id, children } = data[i];
      if (id === key) return data[i];
      if (children) {
        const result = getNodeById(key, children);
        if (result) return result;
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const newChecked = new Set(checked);

    const { id, children } = getNodeById(value, data);
    const ids = [id, ...(children ? getAllChildIds(children) : [])];

    if (checked.has(value)) {
      ids.forEach((id) => newChecked.delete(id));
    } else {
      ids.forEach((id) => newChecked.add(id));
    }

    setChecked(newChecked);
  };

  return (
    <CheckboxesTree
      checked={checked}
      setChecked={setChecked}
      data={data}
      handleChange={handleChange}
    />
  );
};

const CheckboxesTree = ({ data, checked, setChecked, handleChange }) => {
  return (
    <>
      {data.map(({ id, children }) => (
        <div key={id}>
          <Checkbox isChecked={checked.has(id)} id={id} handleChange={handleChange} />
          {children && (
            <div className="ml-4">
              <CheckboxesTree
                checked={checked}
                setChecked={setChecked}
                data={children}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const Checkbox = ({ isChecked, id, handleChange }) => {
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        id={id}
        value={id}
        checked={isChecked}
        onChange={handleChange}
        className="cursor-pointer"
      />
      <label htmlFor={id}>{id}</label>
    </div>
  );
};
