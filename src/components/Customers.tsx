import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Star } from "lucide-react";
import useDebtor from "../hooks/useDebtor";
import "../styles/Customers.css";

const Customers = () => {
  const navigate = useNavigate();
  const { debtors, loading, error } = useDebtor();

  if (loading) {
    return <p>Yuklanmoqda...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="customers-container">
      <header className="customers-header">
        <div className="header-content">
          <button onClick={() => navigate("/profile")} className="back-button">
            <ArrowLeft className="icon" />
            Back to Profile
          </button>
          <h1 className="header-title">Customers</h1>
          <button
            onClick={() => navigate("/add-customer")}
            className="add-button"
          >
            <Plus className="icon" />
            Add Customer
          </button>
        </div>
      </header>

      <main className="customers-list">
        <div className="customers-card">
          <div className="customers-items">
            {debtors.map((customer) => (
              <div key={customer.id} className="customer-item">
                <div className="customer-info">
                  <div className="customer-name">
                    <h3>
                      {customer.full_name}
                      {customer.debts.length > 0 && (
                        <Star className="star-icon" />
                      )}
                    </h3>
                    <p className="customer-phone">
                      {customer.phone_numbers.map((p) => p.number).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="customer-balance">
                  <p className="balance-label">Total balance</p>
                  <p className="balance-amount negative">
                    {customer.debts.reduce(
                      (sum, debt) => sum + parseFloat(debt.debt_sum),
                      0
                    ).toLocaleString()}{" "}
                    so'm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customers;
