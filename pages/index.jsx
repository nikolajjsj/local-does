import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState(
    () => JSON.parse(window.localStorage.getItem('local-does:items')) || [],
  );
  const [currItem, setCurrItem] = useState('');

  useEffect(() => {
    window.localStorage.setItem('local-does:items', JSON.stringify(items));
  }, [items]);

  function handleSubmit(event) {
    event.preventDefault();
    setItems((currentItems) => [...currentItems, currItem]);
    setCurrItem('');
  }

  function deleteItem(name) {
    setItems((currItems) => currItems.filter((item) => {
      if (item === name) return false;
      return true;
    }));
  }

  return (
    <div className="bg-gray-700 text-white h-screen">
      <Head>
        <title>Local todo&apos;s</title>
        <meta name="description" content="See and edit your local todo's" />
      </Head>

      <main className="w-4/5 mx-auto md:w-3/5">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full my-4 p-2 rounded bg-gray-300 text-black"
            placeholder="Write another todo"
            id="current-todo"
            value={currItem}
            onChange={(event) => setCurrItem(event.target.value)}
          />
        </form>

        {items
          && items.map((item) => (
            <div
              key={item}
              className="relative w-full h-32 text-center my-4 pt-4 rounded-lg bg-gray-800 overflow-hidden shadow-md transition"
            >
              <h2 className="text-lg">{item}</h2>
              <button
                className="absolute bottom-0 left-0 w-full h-6 bg-red-400 hover:bg-red-500 focus:outline-none"
                onClick={() => deleteItem(item)}
                type="button"
              >
                Delete
              </button>
            </div>
          ))}
      </main>
    </div>
  );
}
