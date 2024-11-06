import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { Button, Modal, Modal as MUIModal } from "@mui/material"; 
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../modal/Modal"; 

const table = () => {
  const [catigories, setCatigories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [modal, setModal] = useState(false);

  const hendlModal = () => {
    setModal(prev => !prev);
  };


  //EditModal
  const [edit, setEdit] = useState(false);



  //GetCatigories
  async function GetCatigories() {
    await axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((data) => {
        if (data.data.success) {
          setCatigories(data.data.data);
        } else {
          toast.warning("Ma'lumot topilmadi", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  }

  //DeletCatigories
  async function DeletedCatigories(id) {
    const token = localStorage.getItem("token");
    await axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (!data.success) {
          toast.success(data.data.message);
        } else {
          toast.warning(data.data.message);
        }
        GetCatigories();
      });
  }

  useEffect(() => {
    GetCatigories();
  }, []);

  // Sahifadagi elementlar soni bo‘yicha qaysi elementlarni ko'rsatishni aniqlash
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = catigories.slice(indexOfFirstItem, indexOfLastItem);

  // Umumiy sahifalar sonini hisoblash
  const totalPages = Math.ceil(catigories.length / itemsPerPage);

  // Sahifalarni almashtirish funksiyalari
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Categories</h1>
        <button onClick={hendlModal}>Add</button>
      </div>

      {/* {modal && <CustomModal hendlModal={hendlModal} />}  */}

      {modal ? < CustomModal hendlModal={hendlModal}/> : null}

    

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name_En</th>
            <th>Name_Ru</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {catigories.length && currentItems ? (
            currentItems.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{elem.name_en}</td>
                <td>{elem.name_ru}</td>
                <td>
                  <img
                    width={120}
                    height={60}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                    alt=""
                  />
                </td>
                <td className="btn">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                  ></Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => DeletedCatigories(elem.id)}
                  ></Button>
                </td>
              </tr>
            ))
          ) : (
            <Loader />
          )}
        </tbody>
      </table>

      {/* Pagination tugmalari */}
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

export default table;
