interface ListItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    completed: boolean;
  };

  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onToggle, onDelete }) => (
  <div className="flex justify-between items-center py-1">
    <span className="flex-grow text-left">
      {item.name} (x{item.quantity})
    </span>
    <span className="w-20 flex justify-center">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        style={{ marginLeft: "2em" }}
      />
    </span>
    <span className="w-20 flex justify-center">
      <button
        onClick={() => onDelete(item.id)}
        className="w-8 h-8 flex items-center justify-center rounded bg-red-500 text-white text-lg font-bold hover:bg-red-600"
      >
        ×
      </button>
    </span>
  </div>
);

export default ListItem;
