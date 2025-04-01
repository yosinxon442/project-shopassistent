import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // API so‘rov qilish uchun
import { User, Lock, Mail } from "lucide-react";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://nasiya.takedaservice.uz/api/auth/register", {
        username,
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Tokenni saqlash
      navigate("/profile"); // Ro‘yxatdan o‘tgandan keyin profile sahifasiga yo‘naltirish
    } catch (err: any) {
      setError("Ro‘yxatdan o‘tishda xatolik!"); // Xatolikni chiqarish
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Ro‘yxatdan o‘tish</h2>
        {error && <p className="error-message">{error}</p>}
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
            <Link to="/login" className="register-link">Allaqachon akkauntingiz bormi? Kirish</Link>
          </div>

          <button type="submit" className="register-button">Ro‘yxatdan o‘tish</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
