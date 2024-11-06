import React from "react";
import "./navbar.css";

const Navbar = () => {
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      // Kerak bo'lsa, foydalanuvchini login sahifasiga yo'naltirish
      window.location.href = "/login";
    }, 800);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Admin Panel</h1>
      </div>

     
      {/* Chiqish tugmasi */}
      <button className="navbar-btn logout-btn" onClick={logout}>
        🚪 Chiqish
      </button>
    </nav>
  );
};

export default Navbar;
