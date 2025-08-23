import { useEffect, useState } from 'react';

export const useIsIntersecting = (targetRef, containerRef) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const targetRefCurrent = targetRef.current;

    if ([containerRef.current, targetRefCurrent].includes(null)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, root: containerRef.current }
    );

    observer.observe(targetRefCurrent);

    return () => {
      if (targetRefCurrent) observer.unobserve(targetRefCurrent);
    };
  });

  return { isIntersecting };
};
