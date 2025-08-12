import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handeRemoveItem,
  handeCheckItem,
  handelClearList,
}) {
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
        <button onClick={handelClearList}>clear</button>
      </div>
    </div>
  );
}
