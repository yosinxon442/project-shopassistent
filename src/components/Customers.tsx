import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Star } from "lucide-react";
import "../styles/Customers.css";

interface Customer {
  name: string;
  phone: string;
  amount: number;
  starred: boolean;
}

const Customers = () => {
  const navigate = useNavigate();

  const customers: Customer[] = [
    {
      name: "Rahmatulloh Madraximov",
      phone: "+998 91 123 45 67",
      amount: -800000,
      starred: true,
    },
    {
      name: "Lutfulloh To'rayev",
      phone: "+998 91 123 45 67",
      amount: -56861000,
      starred: true,
    },
    {
      name: "Avazbek Soljonov",
      phone: "+998 91 123 45 67",
      amount: -14786000,
      starred: false,
    },
    {
      name: "Madina Mavlonova",
      phone: "+998 91 123 45 67",
      amount: -14786000,
      starred: false,
    },
  ];

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
            {customers.map((customer, index) => (
              <div key={index} className="customer-item">
                <div className="customer-info">
                  <div className="customer-name">
                    <h3>
                      {customer.name}
                      {customer.starred && <Star className="star-icon" />}
                    </h3>
                    <p className="customer-phone">{customer.phone}</p>
                  </div>
                </div>
                <div className="customer-balance">
                  <p className="balance-label">Total balance</p>
                  <p
                    className={`balance-amount ${
                      customer.amount < 0 ? "negative" : "positive"
                    }`}
                  >
                    {customer.amount.toLocaleString()} so'm
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
