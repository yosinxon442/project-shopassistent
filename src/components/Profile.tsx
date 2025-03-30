import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, LogOut, Eye, EyeOff } from "lucide-react";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-actions">
          <button onClick={() => navigate("/calendar")} className="btn-primary">
            <CalendarIcon className="icon" />
            Calendar
          </button>
          <button onClick={() => navigate("/login")} className="btn-secondary">
            <LogOut className="icon" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-info">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="profile-avatar"
            />
            <div>
              <h2 className="profile-name">TestUser123</h2>
              <p className="profile-email">test@example.com</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="profile-stats">
            <div className="stat-box blue">
              <h3 className="stat-title">Total Balance</h3>
              <div className="balance-container">
                <p className="stat-value">
                  {isBalanceVisible ? "135,214,200 so'm" : "********"}
                </p>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="toggle-visibility"
                >
                  {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="stat-box green">
              <h3 className="stat-title">Monthly Statistics</h3>
              <div className="stat-grid">
                <div>
                  <p className="stat-label">Transactions</p>
                  <p className="stat-number">26</p>
                </div>
                <div>
                  <p className="stat-label">Active Days</p>
                  <p className="stat-number">151</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h3 className="activity-title">Recent Activity</h3>
            <div className="activity-box">
              <div className="activity-info">
                <p className="activity-label">Monthly Payment</p>
                <p className="activity-amount">300,000 so'm</p>
              </div>
              <span className="status-badge">Pending</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
