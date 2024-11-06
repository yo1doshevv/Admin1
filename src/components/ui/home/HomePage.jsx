import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Categories from "../../pages/Categories";
import Brands from "../../pages/Brands";
import Cities from "../../pages/Cities";
import Cars from "../../pages/Cars";
import Locations from "../../pages/Locations";
import Models from "../../pages/Models";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container__sidebar">
        <Sidebar />
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/models" element={<Models />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
