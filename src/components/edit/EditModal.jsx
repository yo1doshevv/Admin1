import React, { useState } from "react";
import "./EditModal.css";
import axios from "axios";
import { toast } from "react-toastify";

const EditModal = ({ editData, closeEditModal, getCategories }) => {
  const [formData, setFormData] = useState({
    name_en: editData?.name_en || "",
    name_ru: editData?.name_ru || "",
    file: null,
  });

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

    const formDataToSend = new FormData();
    formDataToSend.append("name_en", formData.name_en);
    formDataToSend.append("name_ru", formData.name_ru);
    if (formData.file) formDataToSend.append("images", formData.file);

    try {
      await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editData.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Data updated successfully!");
      getCategories();
      closeEditModal();
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
