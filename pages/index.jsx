import Head from 'next/head';
import { useState } from 'react';
import { uid } from 'uid';
import useLocalStorage from '../hooks/useLocalStorage';

const defaultItem = {
  title: '',
  id: uid(32),
  done: false,
  createdAt: new Date().now,
};

export default function Home() {
  const [items, setItems] = useLocalStorage();
  const [currItem, setCurrItem] = useState(defaultItem);

  function handleSubmit(event) {
    event.preventDefault();
    setItems((currentItems) => [...currentItems, currItem]);
    setCurrItem(defaultItem);
  }

  function deleteItem(id) {
    setItems((currItems) => currItems.filter((item) => {
      if (item.id === id) return false;
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
            className="w-full my-4 p-2 rounded bg-gray-300 text-black focus-within:outline-none"
            placeholder="Write another todo"
            id="current-todo"
            value={currItem.title}
            onChange={(event) => setCurrItem({
              // eslint-disable-next-line new-cap
              title: event.target.value,
              id: uid(32),
              done: false,
              createdAt: new Date().now,
            })}
          />
        </form>

        {items
          && items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col cursor-pointer justify-between w-full h-44 text-center my-4 rounded-lg bg-gray-800 overflow-hidden shadow-md transition"
            >
              <h2 className="w-full h-full mt-4 text-xl">{item.title}</h2>
              <button
                className="w-full h-6 bg-red-400 hover:bg-red-500 focus:outline-none"
                onClick={() => deleteItem(item.id)}
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
