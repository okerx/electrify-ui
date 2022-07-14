import { useEffect, useRef } from 'react';

/**
 * This hook allows to preserve and access the previous props object
 * */
export default function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
