import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../modal/Modal";
import EditModal from "../edit/EditModal";
import { useLocation } from "react-router-dom";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [model, setModel] = useState([]);
  const [cars, setCars] = useState([]);
  const locales = useLocation()?.pathname;
  const [id, setId] = useState()
  // Get Categories
  const GetCategories = async () => {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${locales}`
      );
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        toast.warning("Ma'lumot topilmadi", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };

  // Delete Category
  const DeleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${locales}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast[response.data.success ? "success" : "warning"](
        response.data.message
      );
      GetCategories();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const getBrands = async () => {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/brands"
      );
      setBrands(response.data.data);
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/locations"
      );
      setLocations(response.data.data);
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cities"
      );
      setCities(response.data.data);
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };

  const getModel = async () => {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/models"
      );
      setModel(response.data.data);
      console.log(response);
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };
  const getCars = async () => {
    try {
      const response = await axios.get(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cars"
      );
      setCars(response.data.data);
      console.log(response);
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    GetCategories();
    getBrands();
    getCities();
    getLocations();
    getModel();
    getCars();
  }, []);

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload(); 
      <Loader/>
    }, 5000); // 5000 millisekund, ya'ni 5 soniya
  };

  // Pagination Helper
  const paginateItems = (items, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const currentItems = paginateItems(categories, currentPage, itemsPerPage);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = (type) => {
    setModalType(type);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalType(null);
  };

  // Logging pathname to ensure correct value

  return (
    <div>
      <div className="header">
        <h1>{locales === "/categories" ? "Categories" : "Brands"}</h1>
        <button onClick={() => openModal("add")}>Add</button>
      </div>

      {modal && modalType === "add" && (
        <CustomModal GetCategories={GetCategories} closeModal={closeModal} />
      )}
      {modal && modalType === "edit" && <EditModal  setId={setId} closeModal={closeModal} GetCategories={GetCategories} categories={categories}/>}

      <table>
        <thead>
          {locales === "/categories" ? (
            <tr>
              <th>#</th>
              <th>Name_En</th>
              <th>Name_Ru</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          ) : locales === "/brands" ? (
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          ) : locales === "/locations" ? (
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>text</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          ) : locales === "/models" ? (
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          ) : locales === "/cities" ? (
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Text</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          ) : locales === "/cars" ? (
            <tr>
              <th>#</th>
              <th>Brand </th>
              <th>Model</th>
              <th>Category </th>
              <th>Color </th>
              <th>City </th>
              <th>Action</th>
            </tr>
          ) : null}
        </thead>
        <tbody>
          {locales === "/categories" ? (
            categories.length ? (
              currentItems.map((elem, index) => (
                <tr key={elem.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{elem.name_en}</td>
                  <td>{elem.name_ru}</td>
                  <td>
                    <img
                      width={120}
                      height={60}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                      alt={elem.name_en}
                    />
                  </td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => DeleteCategory(elem.id)}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : locales === "/brands" ? (
            brands.length ? (
              brands.map((brand, index) => (
                <tr key={brand.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{brand.title}</td>
                  <td>
                    <img
                      width={190}
                      height={80}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${brand.image_src}`}
                      alt={brand.name}
                    />
                  </td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(id)
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => DeleteCategory(brand.id)}
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : locales === "/locations" ? (
            locations.length ? (
              locations.map((location, index) => (
                <tr key={location.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{location.name}</td>
                  <td>{location.text}</td>
                  <td>
                    <img
                      width={190}
                      height={80}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${location.image_src}`}
                      alt={location.name}
                    />
                  </td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      onClick={() => DeleteCategory(location.id)}
                      color="error"
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : locales === "/cities" ? (
            cities.length ? (
              cities.map((city, index) => (
                <tr key={city.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{city.name}</td>
                  <td>{city.text}</td>
                  <td>
                    <img
                      width={190}
                      height={80}
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`}
                      alt={city.name}
                    />
                  </td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      onClick={() => DeleteCategory(city.id)}
                      color="error"
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : locales === "/models" ? (
            model.length ? (
              model.map((model, index) => (
                <tr key={model.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{model.name}</td>
                  <td>{model.brand_title}</td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => DeleteCategory(model.id)}
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : locales === "/cars" ? (
            cars.length ? (
              cars.map((car, index) => (
                <tr key={car.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{car.brand.title}</td>
                  <td>{car.model.name}</td>
                  <td>{car.category.name_en}</td>
                  <td>{car.color}</td>
                  <td>{car.city.name}</td>
                  <td className="btn">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setModalType("edit");
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => DeleteCategory(car.id) }
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )
          ) : null}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Oldingi
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Keyingi
        </button>
      </div>
    </div>
  );
};

export default Table;
