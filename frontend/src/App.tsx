import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="max-w-xl p-6 bg-white rounded shadow">
        <ShoppingList />
      </main>
    </div>
  );
}

export default App;
