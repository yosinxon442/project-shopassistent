import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, FolderOpen, Settings } from "lucide-react";
import "../styles/Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: "Asosiy", path: "/profile" },
    { icon: Users, label: "Mijozlar", path: "/customers" },
    { icon: FolderOpen, label: "Hisobot", path: "/reports" },
    { icon: Settings, label: "Sozlamalar", path: "/settings" },
  ];

  return (
    <div className="navigation-container">
      <div className="navigation-content">
        <h1 className="navigation-title">Dashboard</h1>
        <nav className="navigation-menu">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <item.icon className={`menu-icon ${isActive(item.path) ? "active-icon" : ""}`} />
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
