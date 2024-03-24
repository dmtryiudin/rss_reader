import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const useDebounceSearch = (
  defaultValue: string,
  debounceCallback: (e: string) => void,
) => {
  const [inputString, setInputString] = useState<string>(defaultValue);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!firstUpdate) {
      const timeout = setTimeout(() => {
        debounceCallback(inputString);
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      firstUpdate.current = false;
    }
  }, [inputString]);

  return { inputString, changeHandler };
};
