import React, { useEffect } from "react";
import Login from "./components/ui/login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/ui/home/HomePage";

import Categories from "./components/pages/Categories";
import Brands from "./components/pages/Brands";
import Cities from "./components/pages/Cities";
import Cars from "./components/pages/Cars";
import Locations from "./components/pages/Locations";
import Models from "./components/pages/Models";

import "./App.css";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/categories");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {token?.length ? (
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/models" element={<Models />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
