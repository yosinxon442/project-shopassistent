// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import "../styles/Calendar.css";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

  return (
    <div className="calendar-container">
      {/* Header */}
      <header className="calendar-header">
        <button onClick={() => navigate("/profile")} className="back-button">
          <ArrowLeft className="icon" />
          Back to Profile
        </button>
        <h1 className="calendar-title">Calendar</h1>
      </header>

      {/* Main Content */}
      <main className="calendar-main">
        <div className="calendar-card">
          <div className="calendar-header-content">
            <h2 className="month-title">{format(currentDate, "MMMM, yyyy")}</h2>
            <div className="nav-buttons">
              <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="nav-btn">
                <ChevronLeft className="icon" />
              </button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="nav-btn">
                <ChevronRight className="icon" />
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="weekdays">
            {weekDays.map((day) => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          {/* Days */}
          <div className="days-grid">
            {daysInMonth.map((day) => (
              <div key={day} className={`day-box ${day === 1 ? "highlight" : ""}`}>
                <span className={`day-number ${day === 1 ? "highlight-text" : ""}`}>
                  {day}
                </span>
                {day === 1 && (
                  <div className="payment-info">
                    <p className="payment-label">Payment Due</p>
                    <p className="payment-amount">50,125,000 so'm</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Upcoming Payments */}
          <div className="upcoming-payments">
            <h3 className="upcoming-title">Upcoming Payments</h3>
            <div className="payment-list">
              <div className="payment-box">
                <div>
                  <p className="payment-name">Anvarov Jahongrov</p>
                  <p className="payment-amount">USD 1,000,000</p>
                </div>
                <span className="payment-due">Due Oct 1</span>
              </div>
              <div className="payment-box">
                <div>
                  <p className="payment-name">Otabek Sulaymonov</p>
                  <p className="payment-amount">USD 1,000,000</p>
                </div>
                <span className="payment-due">Due Oct 1</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
