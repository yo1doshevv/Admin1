import React, { useState } from "react";
import "./EditModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const EditModal = ({ categories, closeEditModal, getCategories, id }) => {
  const [formData, setFormData] = useState({
    name_en: categories?.name_en || "",
    name_ru: categories?.name_ru || "",
    file: null,
  });

  const location = useLocation();
  console.log(location); // Debugging purpose, ensure location object is correctly obtained

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization required.");
      return;
    }

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Adding data based on the current location
    switch (location.pathname) {
      case "/categories": {
        formDataToSend.append("name_en", formData.name_en);
        formDataToSend.append("name_ru", formData.name_ru);
        if (formData.file) formDataToSend.append("images", formData.file);
        break;
      }

      case "/brands": {
        formDataToSend.append("title", formData.name_en);
        if (formData.file) formDataToSend.append("images", formData.file);
        break;
      }

      case "/locations": {
        formDataToSend.append("name", formData.name_en);
        formDataToSend.append("text", formData.name_ru);
        if (formData.file) formDataToSend.append("images", formData.file);
        break;
      }

      default:
        break;
    }

    try {
      // Make PUT request to update data
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api${location.pathname}/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the response is successful
      toast.success("Data updated successfully!");
      getCategories(); // Refresh the category list after update
      closeEditModal(); // Close the modal
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Failed to update data. Please try again.");
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>Edit Data</h2>
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

          {location.pathname === "/categories" && (
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
            />
          </label>

          <div className="buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={closeEditModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
