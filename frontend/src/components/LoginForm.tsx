import { useState } from "react";

interface LoginFormProps {
    onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "user" && password === "password") {
            setError("");
            onLogin();
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-2 text-center">My Shopping List</h1>
            <h2 className="text-2xl mb-2 text-center">Login</h2>
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
                Login
            </button>
        </form>
    );
};

export default LoginForm;