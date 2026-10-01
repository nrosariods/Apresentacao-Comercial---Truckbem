import { useRef, type RefObject } from "react";

export function useRefList(count: number): RefObject<HTMLDivElement | null>[] {
  const store = useRef<(HTMLDivElement | null)[]>([]);
  const wrappers = useRef<RefObject<HTMLDivElement | null>[]>([]);

  if (store.current.length !== count) {
    store.current = Array.from({ length: count }, (_, index) => store.current[index] ?? null);
    wrappers.current = Array.from({ length: count }, (_, index) => ({
      get current() {
        return store.current[index] ?? null;
      },
      set current(value: HTMLDivElement | null) {
        store.current[index] = value;
      },
    }));
  }

  return wrappers.current;
}
