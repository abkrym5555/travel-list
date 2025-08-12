import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handelAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handeRemoveItem(id) {
    setItems((oldItems) => oldItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelAddItem} />
      <PackingList items={items} handeRemoveItem={handeRemoveItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 😎</h1>;
}

function Form({ handelAddItem }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function HandelSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false };
    handelAddItem(newItem);
    setdescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={HandelSubmit}>
      <h3>What you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setquantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        name="item"
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handeRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handeRemoveItem={handeRemoveItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handeRemoveItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handeRemoveItem(item.id)}>✖️</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have x items in your list , and you already packed x (x%)</em>
    </footer>
  );
}
