import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, LogOut, Eye, EyeOff, Users, Clock } from "lucide-react";
import { RiUserFill } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-actions">
          <button onClick={() => navigate("/calendar")} className="btn-primary">
            <CalendarIcon className="icon" />
            Calendar
          </button>
          <button onClick={logout} className="btn-secondary">
            <LogOut className="icon" />
            Logout
          </button>
        </div>
      </header>

      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <div className="profile-avatar-border">
              <RiUserFill className="profile-icon" />
              </div>
                 
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{user.username}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-box blue">
              <h3 className="stat-title">Total Balance</h3>
              <div className="stat-content">
                <p className="stat-value">
                  {isBalanceVisible ? `${user.balance} so'm` : "********"}
                </p>
                <button 
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)} 
                  className="toggle-visibility"
                >
                  {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="stat-box red">
              <h3 className="stat-title">Kechiktirilgan to'lovlar</h3>
              <div className="stat-content">
                <Clock className="stat-icon" />
                <p className="stat-value">{user.delayedPayments} so'm</p>
              </div>
            </div>

            <div className="stat-box green">
              <h3 className="stat-title">Mijozlar soni</h3>
              <div className="stat-content">
                <Users className="stat-icon" />
                <p className="stat-value">{user.clientsCount} ta</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;