export type Atom<T> = {
    key: string;
    initialValue: T;
    options: {
      serialize: (value: T) => string;
      deserialize: (value: string) => T;
      shallow: boolean;
    };
  };
  
  export function createAtom<T>(
    key: string,
    initialValue: T,
    options: Partial<Atom<T>["options"]> = {}
  ): Atom<T> {
    const searchParams = new URLSearchParams(window.location.search);
    const defaultOptions = {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
      shallow: false,
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
    const serializedValue = searchParams.get(key);
  
    return {
      key,
      initialValue:
        serializedValue !== null
          ? mergedOptions.deserialize(serializedValue)
          : initialValue,
      options: mergedOptions,
    };
  }
  