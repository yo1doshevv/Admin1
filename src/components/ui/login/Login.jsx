import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function getToken() {
    const formData = new FormData();
    formData.append("phone_number", phone);
    formData.append("password", password);

    try {
      const response = await axios.post(
        `https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        const token = response?.data?.data?.tokens?.accessToken?.token;

        localStorage.setItem("token", token);

        navigate("/categories");
        toast.success("Hush kelibsan", {
          position: "top-center",
          autoClose: 2000,
        });
      }

      // console.log(response);
    } catch (err) {
      console.error("Login muvaffaqiyatsiz:", err);
      setError("Kirishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Kiritilgan telefon raqami:", phone);
    console.log("Kiritilgan parol:", password);

    getToken();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Kirish</h2>

        {/* Telefon raqami */}
        <label htmlFor="phone">Telefon raqami</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon raqamingizni kiriting"
          required
        />

        {/* Parol */}
        <label htmlFor="password">Parol</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parolingizni kiriting"
          required
        />

        {/* Xatolik haqida xabar */}
        {error && <p className="error-message">{error}</p>}

        {/* Kirish tugmasi */}
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default Login;
