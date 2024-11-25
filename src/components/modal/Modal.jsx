import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Toast funksiyalarini import qilamiz
import "./Modal.css";
import { useLocation } from "react-router-dom";
import Loader from "../loader/Loader";
import { dark } from "@mui/material/styles/createPalette";

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
  const [categories, setCategories] = useState([]);
  const [model, setModel] = useState([]);
  const [Location, setLocation] = useState([]);
  const [Cities, setCities] = useState([]);
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedlocation, setSelectedlocation] = useState("");
  const [selectedmodel, setSelectedmodel] = useState("");
  const [selectedcategories, setSelectedCategories] = useState("");

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
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

    let formDataToSend = new FormData();

    switch (locations) {
      case "/categories": {
        formDataToSend.append("name_en", formData.name_en);
        formDataToSend.append("name_ru", formData.name_ru);
        formDataToSend.append("images", formData.file);
        break;
      }

      case "/brands": {
        formDataToSend.append("title", formData.name_en);
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
        formDataToSend.append("name", formData.model);
        formDataToSend.append("brand_id", selectedbrand);
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
        formDataToSend.append("PremiumProtectionPrice", formData.PremiumProtectionPrice);
        formDataToSend.append("PriceinAED", formData.PriceinAED);
        formDataToSend.append("PriceinUSD", formData.PriceinUSD);
        formDataToSend.append("PriceinAED", formData.PriceinAED);
        if (formData.file) formDataToSend.append("images", formData.file);
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
        toast.success("Data added successfully!");
        hendlModal();
      })
      .catch((error) => {
        console.error("API ga yuborishda xatolik:", error);
        toast.error("Failed to add data. Please try again.");
      });
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
    await axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
    .then((data)=>{
      if(data.data.success){
        setCategories(data.data.data)
        console.log(data);
        
      }
    }) 
  }

  async function getModel() {
    await axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
    .then((data)=>{
      if(data.data.success){
        setModel(data.data.data)
        console.log(data);
        
      }
    }) 
  }

  async function getLocation() {
    await axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
    .then((data)=>{
      if(data.data.success){
        setLocation(data.data.data)
        console.log(data);
        
      }
    }) 
  }

  async function getCities() {
    await axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/cities`)
    .then((data)=>{
      if(data.data.success){
        setLocation(data.data.data)
        console.log(data);
        
      }
    }) 
  }
  

  console.log(selectedmodel);
  console.log(selectedlocation);
  console.log(selectedcategories);
  console.log(selectedbrand);
  console.log(selectedCities);

  useEffect(() => {
    getBrands();
    getCategories()
    getModel()
    getLocation()
    getCities()
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Data</h2>
        <form onSubmit={handleSubmit}>
          {locations === "/locations" || locations === "/cities" ? (
            <>
            <br />
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
                <br />
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
                <br />
                Brand:
                <br />
                <br />
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedbrand(e.target.value);
                  }}
                >
                  {brands.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.title}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : locations === "/brands" ? (
            <>
              <label>
                <br />
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
                <br />
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
                <br />
                *categoriy:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedCategories(e.target.value);
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
                *Brand:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedbrand(e.target.value);
                  }}
                >
                  {brands.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                *Model:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedmodel(e.target.value);
                  }}
                >
                  {model.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                *Location:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedlocation(e.target.value);
                  }}
                >
                  {Location.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                *City:
                <select name="" id=""
                  onChange={(e) => {
                    setSelectedbrand(e.target.value);
                  }}
                >
                  {brands.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.title}
                    </option>
                  ))}
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

          {locations === "/models" || locations === "/cars" ? null : (
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
          )}

          <div className="button-container">
            <button type="submit">Add</button>
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
