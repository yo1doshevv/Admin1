import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Toast funksiyalarini import qilamiz
import "./Modal.css";
import { useLocation } from "react-router-dom";

const CustomModal = ({ hendlModal }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    file: null,
  });

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload(); // Sahifani 5 soniyadan keyin yangilash
    }, 5000); // 5000 millisekund, ya'ni 5 soniya
  };

  const locations = useLocation().pathname;
  console.log(locations);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formDataToSend = new FormData(); // `formDataToSend` ni tashqarida yaratish

    // `switch` operatori ichidagi `case` bloklarini to'g'ri yozish
    switch (locations) {
      case '/categories': {
        formDataToSend.append("name_en", formData.name_en);
        formDataToSend.append("name_ru", formData.name_ru);
        formDataToSend.append("images", formData.file);
        break; // break qo'yish kerak
      }

      case "/brands": {
        formDataToSend.append("title", formData.name_en); // Russian (name_ru) kirish uchun variant qo'shishingiz mumkin
        formDataToSend.append("images", formData.file);
        break; // break qo'yish kerak
      }

      default:
        break;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token topilmadi!");
      toast.error("Authorization required.");
      return;
    }

    // API so'rovini yuborish
    axios
      .post(
        `https://autoapi.dezinfeksiyatashkent.uz/api${locations}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Data added successfully!"); // Muvaffaqiyatli xabar
        hendlModal(); // Modalni yopish
      })
      .catch((error) => {
        console.error("API ga yuborishda xatolik:", error);
        toast.error("Failed to add data. Please try again."); // Xato xabari
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Data</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name (English):
            <input
              type="text"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </label>
          {locations === "/categories" && (
            <label>
              Name (Russian):
              <input
                type="text"
                name="name_ru"
                value={formData.name_ru}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Upload File:
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </label>
          <div className="button-container">
            <button type="submit">
              Add
            </button>
            <button type="button" onClick={hendlModal} className="close-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
