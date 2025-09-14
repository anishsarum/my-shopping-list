import { useState } from "react";
import LoginForm from "./components/AuthForm";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (jwtToken: string) => {
    setToken(jwtToken);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="max-w-xl p-6 bg-white rounded shadow">
        {token ? <ShoppingList token={token} /> : <LoginForm onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;
