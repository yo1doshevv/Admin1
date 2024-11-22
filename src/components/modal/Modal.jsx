import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Toast funksiyalarini import qilamiz
import "./Modal.css";
import { useLocation } from "react-router-dom";
import Loader from "../loader/Loader";

const CustomModal = ({ hendlModal }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    file: null,
    name: "",
    text: "",
    model: "",
    brand: "",
    Category: "",
    Color: "",
    City: "",
  });

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload(); 
      <Loader/>
    }, 5000); // 5000 millisekund, ya'ni 5 soniya
  };

  const locations = useLocation()?.pathname;
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
      case "/categories": {
        formDataToSend.append("name_en", formData.name_en);
        formDataToSend.append("name_ru", formData.name_ru);
        formDataToSend.append("images", formData.file);
        break;
      }

      case "/brands": {
        formDataToSend.append("title", formData.name_en); // Russian (name_ru) kirish uchun variant qo'shishingiz mumkin
        formDataToSend.append("images", formData.file);
        break;
      }

      case "/locations": {
        formDataToSend.append("name", formData.name);
        formDataToSend.append("text", formData.text);
        formDataToSend.append("images", formData.file);
        break;
      }

      case "/cities": {
        formDataToSend.append("name", formData.name);
        formDataToSend.append("text", formData.text);
        formDataToSend.append("images", formData.file);
        break;
      }

      case "/models": {
        formDataToSend.append("model", formData.model);
        formDataToSend.append("brand", formData.brand);
        break;
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
          {locations === "/locations" || locations === "/cities" ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Text:
                <input
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/categories" ? (
            <>
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
            </>
          ) : locations === "/models" ? (
            <>
              <label>
                Model:
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/brands" ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/brands" ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/brands" ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/brands" ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : locations === "/cars" ? (
            <>
              <label>
                brand:
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                model:
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                categoriy:
                <input
                  type="text"
                  name="categoriy"
                  value={formData.Category}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                color:
                <input
                  type="text"
                  name="color"
                  value={formData.Color}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                city:
                <input
                  type="text"
                  name="city"
                  value={formData.City}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : null}

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
            <button type="submit" onClick={handleRefresh}>Add</button>
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
