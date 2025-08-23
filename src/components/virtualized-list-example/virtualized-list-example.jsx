import { useMemo } from 'react';
import { VirtualizedList } from './virtualized-list';

export const VirtualizedListExample = () => {
  const list = useMemo(() => {
    return Array.from({ length: 1000 }).map((_, idx) => idx + 1);
  }, []);

  return (
    <div className="p-4 bg-amber-200 w-fit">
      <VirtualizedList list={list} containerHeight={500} itemHeight={50} containerWidth={400} />
    </div>
  );
};
