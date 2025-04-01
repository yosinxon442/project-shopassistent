import { useEffect, useState } from "react";
import API from "../services/API";

interface PhoneNumber {
  number: string;
}

interface Debt {
  debt_sum: string;
  debt_status: string;
  total_debt_sum?: string;
}

interface Debtor {
  id: string;
  full_name: string;
  phone_numbers: PhoneNumber[];
  address: string;
  description?: string;
  images?: { url: string }[];
  debts: Debt[];
  created_at: string;
  updated_at: string;
}

const useDebtor = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebtors = async () => {
      try {
        const response = await API.get("/debtor?spik=0&take=10");
        if (Array.isArray(response.data?.data)) {
          setDebtors(response.data.data);
        } else {
          setDebtors([]);
        }
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchDebtors();
  }, []);

  const addDebtor = async (debtorData: {
    full_name: string;
    phone_numbers: string[];
    address: string;
    images: File[];
    debt_sum: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token mavjud emas, iltimos, avval tizimga kiring.");
      }

      const formData = new FormData();
      formData.append("full_name", debtorData.full_name);
      formData.append("address", debtorData.address);
      formData.append("debt_sum", debtorData.debt_sum);

      debtorData.phone_numbers.forEach((phone, index) => {
        formData.append(`phone_numbers[${index}]`, phone);
      });

      debtorData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await API.post("/debtor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setDebtors((prev) => [...prev, response.data]);
    } catch (err) {
      setError("Yangi mijoz qo‘shishda xatolik yuz berdi");
    }
  };

  return { debtors, loading, error, addDebtor };
};

export default useDebtor;
