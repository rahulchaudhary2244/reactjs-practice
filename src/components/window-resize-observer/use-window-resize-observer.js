import { useEffect, useState } from 'react';
import { debounce } from '../debounce-search/use-debounce';

export const useWindowResizeObserver = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      console.log('triggered');

      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const denouncedResize = debounce(handleResize);

    window.addEventListener('resize', denouncedResize);
    return () => window.removeEventListener('resize', denouncedResize);
  }, []);

  return dimensions;
};
