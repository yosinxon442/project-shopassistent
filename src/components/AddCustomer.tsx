import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import "../styles/AddCustomer.css";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    address: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <div>
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
            </div>

            <div className="phone-fields">
              <div>
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
              </div>
              <div>
                <label htmlFor="phone2">Phone Number 2</label>
                <input
                  type="tel"
                  id="phone2"
                  value={formData.phone2}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone2: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                rows={3}
                required
              />
            </div>

            <div className="image-upload">
              <label>Upload Images</label>
              <div className="image-grid">
                {[1, 2].map((num) => (
                  <div key={num} className="image-upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                    />
                    <div className="upload-placeholder">
                      <Plus className="upload-icon" />
                      <p>Upload image {num}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="submit-container">
              <button type="submit" className="submit-button">
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCustomer;
