import { useEffect, useState } from 'react';

export default function useLocalStorage() {
  const [items, setItems] = useState(
    () => JSON.parse(window.localStorage.getItem('local-does:items')) || [],
  );

  useEffect(() => {
    window.localStorage.setItem('local-does:items', JSON.stringify(items));
  }, [items]);

  return [items, setItems];
}
