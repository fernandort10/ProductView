import React, { useState, useContext } from "react";
import { UserContext } from "../UserProvider/UserProvider";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { username, setUsername, isAdmin, setIsAdmin, password, setPassword } =
    useContext(UserContext);
  const [data, setData] = useState({
    username: "",
    password: "",
    isAdmin: isAdmin,
  });

  const url = "http://127.0.0.1:8000/api/users";

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
    };

    axios
      .get(`${url}/${userData.username}/${userData.password}`)
      .then((json) => {
        setData(json.data);
        setUsername(json.data.username);
        setPassword(json.data.password);
        localStorage.setItem("username", json.data.username);
        setIsAdmin(json.data.isAdmin);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <p>{username}</p>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <a href="#">Don't have an account?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
