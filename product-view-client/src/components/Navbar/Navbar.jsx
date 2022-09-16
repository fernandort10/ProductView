import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <h1>Product View</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}
