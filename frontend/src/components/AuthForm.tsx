import { useState } from "react";

interface AuthFormProps {
  onLogin: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/v1/auth/${isSignup ? "signup" : "signin"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (error) {
      console.error(error);
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-2 text-center">My Shopping List</h1>
      <h2 className="text-2xl mb-2 text-center">{isSignup ? "Sign Up" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 border border-gray-300 rounded px-3"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-10 border border-gray-300 rounded px-3"
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>
      <button
        type="button"
        className="text-blue-500 underline mt-2"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup ? "Already have an account? Login" : "No account? Sign up"}
      </button>
    </form>
  );
};

export default AuthForm;
