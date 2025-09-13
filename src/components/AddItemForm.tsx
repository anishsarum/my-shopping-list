import { useState } from "react";

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddItem(name, quantity);
      setName("");
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          required
          className="flex-grow h-10"
        />
      </span>
      <span>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          required
          className="w-16 h-10"
        />
      </span>
      <span className="ml-auto pr-6">
        <button
          className="px-4 py-2 h-10 bg-blue-500 text-white rounded"
          type="submit"
        >
          Add Item
        </button>
      </span>
    </form>
  );
};

export default AddItemForm;
