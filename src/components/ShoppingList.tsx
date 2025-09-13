import { useState } from "react";
import ListItem from "./ListItem";
import AddItemForm from "./AddItemForm";

interface Item {
  id: number;
  name: string;
  quantity: number;
  completed: boolean;
}

const ShoppingList: React.FC = () => {
  // const [items, setItems] = useState<Item[]>([]);

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Apples", quantity: 3, completed: false },
    { id: 2, name: "Bread", quantity: 2, completed: false },
    { id: 3, name: "Milk", quantity: 5, completed: true },
    { id: 4, name: "Eggs", quantity: 12, completed: false },
  ]);

  const handleToggle = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddItem = (name: string, quantity: number) => {
    setItems((items) => [
      ...items,
      {
        id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        name,
        quantity,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onToggle={handleToggle} />
      ))}
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
};

export default ShoppingList;
