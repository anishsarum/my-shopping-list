import { useEffect, useState } from "react";
import LoginForm from "./components/AuthForm";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (jwtToken: string) => {
    setToken(jwtToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="max-w-xl p-6 bg-white rounded shadow">
        {token ? <ShoppingList token={token} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;
