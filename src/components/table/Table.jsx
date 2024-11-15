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
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [brands, setBrands] = useState([]);
  const locales = useLocation(); // useLocation to detect current path

  // Get Categories
  const GetCategories = async () => {
    try {
      const response = await axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/categories");
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
      const response = await axios.delete(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast[response.data.success ? "success" : "warning"](response.data.message);
      GetCategories();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  // Fetch Brands (Not currently used)
  const getBrands = async () => {
    try {
      const response = await axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/brands");
      setBrands(response.data.data);
      console.log(response);
      
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }    
  };

  useEffect(() => {
    GetCategories();
    getBrands();
  }, []);

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
  console.log(locales.pathname); // Debugging line

  return (
    <div>
      <div className="header">
        <h1>{locales.pathname === "/categories" ? "Categories" : "Brands"}</h1>
        <button onClick={() => openModal('add')}>Add</button>
      </div>

      {modal && modalType === 'add' && <CustomModal GetCategories={GetCategories} closeModal={closeModal} />}
      {modal && modalType === 'edit' && <EditModal closeModal={closeModal} />}

      <table>
        <thead>
          {locales.pathname === "/categories" ? (
            <tr>
              <th>#</th>
              <th>Name_En</th>
              <th>Name_Ru</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          ) : locales.pathname === "/brands" ? (
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          ) : null}
        </thead>
        <tbody>
          {locales.pathname === "/categories" ? (
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
                        setModalType('edit');
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
          ) : locales.pathname === "/brands" ? (
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
                        setModalType('edit');
                        setModal(true);
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      color="error"
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
