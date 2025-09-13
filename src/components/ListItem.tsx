interface ListItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    completed: boolean;
  };

  onToggle: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onToggle }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.4em",
    }}
  >
    <span>
      {item.name} (x{item.quantity})
    </span>
    <input
      type="checkbox"
      checked={item.completed}
      onChange={() => onToggle(item.id)}
      style={{ marginLeft: "2em" }}
    />
  </div>
);

export default ListItem;
