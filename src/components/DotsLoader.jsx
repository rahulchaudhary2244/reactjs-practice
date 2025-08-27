import { useEffect, useState } from 'react';

export const DotsLoader = ({ count = 3, size = 30, color = '#e74c3c', speed = 1 }) => {
  const dots = Array.from({ length: count }).map((_, idx) => idx);
  const [active, setActive] = useState(dots[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prev) => {
        if (prev + 1 === count) return 0;
        return prev + 1;
      });
    }, speed * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {dots.map((x) => (
        <div
          key={x}
          style={{
            height: size,
            width: size,
            backgroundColor: active === x ? 'gray' : color,
            borderRadius: '50%',
          }}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
};
