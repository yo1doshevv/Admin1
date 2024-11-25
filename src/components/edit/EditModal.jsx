import React, { useEffect, useState } from "react";
import "./EditModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const EditModal = ({ categories, closeEditModal, getCategories }) => {
  const [formData, setFormData] = useState({
    name_en: categories?.name_en || "",
    name_ru: categories?.name_ru || "",
    file: null,
    model: "",
    brand: "",
    Category: "",
    Brand: "",
    Model: "",
    Location: "",
    City: "",
    Color: "",
    year: "",
    Seconds: "",
    Speed: "",
    MaxPeople: "",
    Motor: "",
    Transmission: "",
    DriveSide: "",
    Yoqilgi: "",
    LimitPerDay: "",
    Deposit: "",
    PremiumProtectionPrice: "",
    PriceinAED: "",
    PriceinUSD: "",
    PriceinAED: "",
    PriceinUSD: "",
  });

  const [brands, setBrands] = useState([]);
  const [categoriess, setCategoriess] = useState([]);
  const [model, setModel] = useState([]);
  const [Location, setLocation] = useState([]);
  const [Cities, setCities] = useState([]);
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedlocation, setSelectedlocation] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [selectedcategoriess, setSelectedCategoriess] = useState("");

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
      case "/categoriess": {
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

      case "/cities": {
        formDataToSend.append("name", formData.name_en);
        formDataToSend.append("text", formData.name_ru);
        if (formData.file) formDataToSend.append("images", formData.file);
        break;
      }

      case "/models": {
        formDataToSend.append("model", formData.model);
        formDataToSend.append("brand", formData.brand);
        if (formData.file) formDataToSend.append("images", formData.file);
        break;
      }

      case "/cars": {
        formDataToSend.append("categoriy", formData.Category);
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("Model", formData.Model);
        formDataToSend.append("Location", formData.Location);
        formDataToSend.append("City", formData.City);
        formDataToSend.append("Color", formData.Color);
        formDataToSend.append("Year", formData.year);
        formDataToSend.append("Seconds", formData.Seconds);
        formDataToSend.append("Speed", formData.Speed);
        formDataToSend.append("MaxPeople", formData.MaxPeople);
        formDataToSend.append("Motor", formData.Motor);
        formDataToSend.append("Transmission", formData.Transmission);
        formDataToSend.append("DriveSide", formData.DriveSide);
        formDataToSend.append("Yoqilgi", formData.Yoqilgi);
        formDataToSend.append("LimitPerDay", formData.LimitPerDay);
        formDataToSend.append("Deposit", formData.Deposit);
        formDataToSend.append(
          "PremiumProtectionPrice",
          formData.PremiumProtectionPrice
        );
        formDataToSend.append("PriceinAED", formData.PriceinAED);
        formDataToSend.append("PriceinUSD", formData.PriceinUSD);
        formDataToSend.append("PriceinAED", formData.PriceinAED);
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

      useEffect((e) => {
        response();
      });

      // If the response is successful
      toast.success("Data updated successfully!");
      getCategoriess(); // Refresh the category list after update
      closeEditModal(); // Close the modal
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Failed to update data. Please try again.");
    }
  };

  async function getBrands() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then((data) => {
        if (data.data.success) {
          setBrands(data.data.data);
        }
      });
  }

  async function getCategories() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then((data) => {
        if (data.data.success) {
          setCategoriess(data.data.data);
          console.log(data);
        }
      });
  }

  async function getModel() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then((data) => {
        if (data.data.success) {
          setModel(data.data.data);
          console.log(data);
        }
      });
  }

  async function getLocation() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
      .then((data) => {
        if (data.data.success) {
          setLocation(data.data.data);
          console.log(data);
        }
      });
  }

  async function getCities() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/cities`)
      .then((data) => {
        if (data.data.success) {
          setCities(data.data.data);
          console.log(data);
        }
      });
  }

  console.log(selectedCities);
  console.log(selectedmodel);
  console.log(selectedlocation);
  console.log(selectedcategoriess);
  console.log(selectedbrand);

  useEffect(() => {
    getBrands();
    getCategories();
    getModel();
    getLocation();
    getCities();
  }, []);

  return (
    <div className="edit-modal-overlay modal-overlay">
      <div
        className="edit-modal-content modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Data</h2>
        <form onSubmit={handleSubmit}>
          {location.pathname === "/categoriess" ? (
            <>
              <label>
                Name Ru:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Name En:
                <input
                  type="text"
                  name="name_ru"
                  value={formData.name_ru}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : location.pathname === "/locations" ? (
            <>
              <label>
                name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                text:
                <input
                  type="text"
                  name="name_ru"
                  value={formData.name_ru}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : location.pathname === "/cities" ? (
            <>
              <label>
                name:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                text:
                <input
                  type="text"
                  name="name_ru"
                  value={formData.name_ru}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : location.pathname === "/models" ? (
            <>
              <label>
                model:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                brand:
                <br />
                <select name="" id="">
                  <option value="nexia">nexia</option>
                </select>
              </label>
            </>
          ) : location.pathname === "/cars" ? (
            <>
               <label>
                <br />
                *categoriy:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedCategoriess(e.target.value);
                  }}
                >
                  {categories.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name_en}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <br />
                *Brand:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedbrand(e.target.value);
                  }}
                >
                  {categories.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name_en}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                *Model:
                <select name="" id="">
                  <option value="nexia">Nexia</option>
                </select>
              </label>
              <label>
                *Location:
                <select name="" id="">
                  <option value="nexia">Nexia</option>
                </select>
              </label>
              <label>
                *City:
                <select name="" id="">
                  <option value="nexia">Nexia</option>
                </select>
              </label>
              <label>
                *color:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Year:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Seconds:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Speed:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Max People:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Motor:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Seconds:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Transmission:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Drive Side:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Yoqilg'i:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Limit Per Day:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Premium Protection Price:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Price in AED:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Price in USD(Otd):
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Price in AED (Otd):
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                *Price in USD:
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
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
                  required
                />
              </label>
            </>
          ) : null}

          {location.pathname === "/models" ||
          location.pathname === "/cars" ? null : (
            <label>
              Upload File:
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          )}

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
