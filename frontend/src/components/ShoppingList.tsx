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
  const [items, setItems] = useState<Item[]>([]);

  const handleToggle = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
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
      <div className="flex justify-between items-center font-bold border-b border-gray-200 pb-2 mb-2">
        <span className="flex-grow text-left">Item</span>
        <span className="w-20 text-center">Completed</span>
        <span className="w-20 text-center">Delete</span>
      </div>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
      {items.length > 0 && <hr className="border-gray-200 mt-2 mb-5" />}
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
};

export default ShoppingList;
