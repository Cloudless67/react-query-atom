import { useState, useEffect } from "react";
import { Atom } from "../core/atom";

export function useAtom<T>(atom: Atom<T>): [T, (value: T) => void] {
  const [state, setState] = useState<T>(atom.initialValue);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const serializedValue = searchParams.get(atom.key);

    if (serializedValue !== null) {
      setState(atom.options.deserialize(serializedValue));
    }

    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const serializedValue = searchParams.get(atom.key);

      if (serializedValue !== null) {
        setState(atom.options.deserialize(serializedValue));
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atom.key]);

  const setValue = (value: T) => {
    setState(value);
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(atom.key, atom.options.serialize(value));
    if (atom.options.shallow) {
      window.history.replaceState(null, "", "?" + searchParams.toString());
    } else {
      window.history.pushState(null, "", "?" + searchParams.toString());
    }
  };

  return [state, setValue];
}
