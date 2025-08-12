import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
  function handelClearList() {
    if (window.confirm("do you want to remove you list?")) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelAddItem} />
      <PackingList
        items={items}
        handeRemoveItem={handeRemoveItem}
        handeCheckItem={handeCheckItem}
        handelClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}
