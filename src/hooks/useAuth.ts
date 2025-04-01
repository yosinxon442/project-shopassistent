import API from "../services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useStore } from "./useStore";

type LoginData = {
  login: string;
  hashed_password: string;
};

// API orqali login qilish funksiyasi
const login = async ({ login, hashed_password }: LoginData) => {
  try {
    const response = await API.post("/auth/login", { login, hashed_password });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Login muvaffaqiyatsiz tugadi!");
    }

    return response.data;
  } catch (error: any) {
    console.error("Login xatosi:", error);
    throw error;
  }
};

// API orqali foydalanuvchi profilini olish
const fetchUserProfile = async (token: string) => {
  try {
    const response = await API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      username: response.data.username,
      email: response.data.email,
      avatar: response.data.avatar || "https://via.placeholder.com/100",
      balance: response.data.balance || 0,
      delayedPayments: response.data.delayedPayments || 0,
      clientsCount: response.data.clientsCount || 0,
    };
  } catch (error) {
    console.error("Profilni olishda xatolik:", error);
    throw error;
  }
};

// Auth hook
export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const queryClient = useQueryClient(); // ✅ QueryClient olish

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (!data?.accessToken) {
        message.error("Login ma'lumotlari noto'g'ri qaytdi!");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      try {
        const userData = await fetchUserProfile(data.accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        queryClient.invalidateQueries(["user"]); // ✅ Cache yangilash
        navigate("/profile");
        message.success("Muvaffaqiyatli tizimga kirdingiz!");
      } catch (error) {
        message.error("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.");
      }
    },

    onError(error: any) {
      console.error("Tizimga kirishda xatolik:", error);
      if (error?.response?.status === 400) {
        message.error("Login yoki parol noto'g'ri!");
      } else if (error?.response?.status === 403) {
        message.warning("Siz faol emassiz. Iltimos, do'kon bilan bog'laning!");
      } else {
        message.error("Kirishda xatolik yuz berdi. Qayta urinib ko'ring.");
      }
    },
  });

  // Logout funksiyasi
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear(); // ✅ Logout qilganda cache tozalash
    navigate("/login");
    message.info("Tizimdan chiqdingiz.");
  };

  return {
    loginMutation,
    logout,
  };
};
