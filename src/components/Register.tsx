import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Ro‘yxatdan o‘tish</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
              <Mail className="icon" />
              <input
                type="email"
                required
                className="input-field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="register-links">
            <Link to="/login" className="register-link">
              Allaqachon akkauntingiz bormi? Kirish
            </Link>
          </div>

          <button type="submit" className="register-button">
            Ro‘yxatdan o‘tish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
