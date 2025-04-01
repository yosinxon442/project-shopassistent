import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import useDebtor from "../hooks/useDebtor";
import "../styles/AddCustomer.css";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { addDebtor } = useDebtor();
  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    address: "",
    debtAmount: "",
    images: [] as File[],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, e.target.files![0]],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDebtor({
      full_name: formData.name,
      phone_numbers: [formData.phone1, formData.phone2].filter(Boolean),
      address: formData.address,
      images: formData.images,
      debt_sum: formData.debtAmount,
    });
    navigate("/customers");
  };

  return (
    <div className="add-customer-container">
      <header className="add-customer-header">
        <div className="header-content">
          <button onClick={() => navigate("/customers")} className="back-button">
            <ArrowLeft className="icon" />
            Back to Customers
          </button>
          <h1 className="header-title">Add New Customer</h1>
        </div>
      </header>

      <main className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="customer-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />

            <label htmlFor="phone1">Phone Number 1</label>
            <input
              type="tel"
              id="phone1"
              value={formData.phone1}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone1: e.target.value }))
              }
              required
            />

            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              required
            />

            <label htmlFor="debtAmount">Debt Amount (so'm)</label>
            <input
              type="number"
              id="debtAmount"
              value={formData.debtAmount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, debtAmount: e.target.value }))
              }
              required
            />

            <button type="submit" className="submit-button">
              Add Customer
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCustomer;
