import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginMutation } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ login: username, hashed_password: password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Dasturga kirish</h2>
        {loginMutation.isError && <p className="error-message">Login yoki parol noto‘g‘ri!</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <User className="icon" />
              <input
                type="text"
                required
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <Lock className="icon" />
              <input
                type="password"
                required
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="login-button" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Kirish..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
