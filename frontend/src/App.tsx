import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="max-w-xl p-6 bg-white rounded shadow">
        {isLoggedIn ? <ShoppingList /> : <LoginForm onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;
