import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import AddItemForm from "./AddItemForm";

interface Item {
  id: number;
  name: string;
  quantity: number;
  completed: boolean;
}

interface ShoppingListProps {
  token: string;
  onLogout: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ token, onLogout }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/v1/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, [token]);

  const handleToggle = async (id: number) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      const res = await fetch(`/api/v1/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: item.name,
          quantity: item.quantity,
          completed: !item.completed,
        }),
      });
      if (res.ok) {
        const updatedItem = await res.json();
        setItems((items) =>
          items.map((item) =>
            item.id === id ? updatedItem : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/v1/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setItems((items) => items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleAddItem = async (name: string, quantity: number) => {
    try {
      const res = await fetch(`/api/v1/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, quantity, completed: false }),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems((items) => [...items, newItem]);
      }
    } catch (error) {
      console.error("Failed to add item", error);
    }
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
      <hr className="border-gray-200 mt-5 mb-5" />
      <div className="flex justify-center">
        <button onClick={onLogout} className="p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default ShoppingList;
