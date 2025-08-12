export default function Item({ item, handeRemoveItem, handeCheckItem }) {
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
