import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handelAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handeRemoveItem(id) {
    setItems((oldItems) => oldItems.filter((item) => item.id !== id));
  }

  function handeCheckItem(id) {
    setItems((oldItems) =>
      oldItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelAddItem} />
      <PackingList
        items={items}
        handeRemoveItem={handeRemoveItem}
        handeCheckItem={handeCheckItem}
      />
      <Stats items={items} />
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

function PackingList({ items, handeRemoveItem, handeCheckItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortItems;
  if (sortBy === "input") sortItems = items;
  if (sortBy === "description") {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handeRemoveItem={handeRemoveItem}
            handeCheckItem={handeCheckItem}
          />
        ))}
      </ul>
      <div className="actions" onChange={(e) => setSortBy(e.target.value)}>
        <select value={sortBy}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, handeRemoveItem, handeCheckItem }) {
  return (
    <li>
      <input
        name="check"
        type="checkbox"
        value={item.packed}
        onChange={() => handeCheckItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handeRemoveItem(item.id)}>✖️</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>start add item to go ❤️‍🔥</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You are ready to go ✈️"
          : `you have ${numItems} items in your list , and you already packed
        ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
