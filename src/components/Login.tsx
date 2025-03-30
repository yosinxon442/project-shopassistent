import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h2 className="login-title">Dasturga kirish</h2>
        </div>
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

          <div className="login-links">
            <Link to="/register" className="login-link">
              Register
            </Link>
            <a href="#" className="login-link">
              Forgot password?
            </a>
          </div>

          <div>
            <button type="submit" className="login-button">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
