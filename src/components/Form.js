import { useState } from "react";

export default function Form({ handelAddItem }) {
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
