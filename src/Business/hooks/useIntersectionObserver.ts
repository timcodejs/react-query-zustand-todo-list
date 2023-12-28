import { useCallback, useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    []
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(ref.current);

    console.log(observer);

    return () => observer.disconnect();
  }, [ref, options, observerCallback]);

  return ref;
};
