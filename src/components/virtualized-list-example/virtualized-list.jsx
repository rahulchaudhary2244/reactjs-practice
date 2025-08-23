import { useState } from 'react';

const OVER_SCAN = 1;

//tutorial - https://youtu.be/IFBq4j6htpE?si=Z5mtpunrMrYDhNSv

export const VirtualizedList = ({ containerHeight, containerWidth, itemHeight, list = [] }) => {
  const vissibleElementsInContainer = Math.floor(containerHeight / itemHeight);
  const [indices, setIndices] = useState([0, vissibleElementsInContainer]);
  const [startIdx, endIdx] = indices;
  const virtualList = list.slice(startIdx, endIdx + OVER_SCAN);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;

    const newStartIdx = Math.floor(scrollTop / itemHeight);
    const newEndIdx = newStartIdx + vissibleElementsInContainer;
    setIndices([newStartIdx, newEndIdx]);
  };

  return (
    <>
      <div
        id="container"
        style={{ height: containerHeight, width: containerWidth }}
        className="bg-green-300 overflow-auto"
        onScroll={handleScroll}
      >
        <div className="w-full" style={{ height: itemHeight * list.length, position: 'relative' }}>
          {virtualList.map((item, idx) => (
            <div
              id="item"
              key={item}
              style={{
                height: itemHeight,
                position: 'absolute',
                top: (startIdx + idx) * itemHeight, // this will move scrollbar down as we scroll up
              }}
              className="w-full"
            >
              <ItemContent item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div>StartIdx = {startIdx}</div>
        <div>EndIdx = {endIdx}</div>
      </div>
    </>
  );
};

const ItemContent = ({ item }) => {
  return (
    <div className="border border-purple-600 flex items-center justify-center h-full">
      Item {item}
    </div>
  );
};
