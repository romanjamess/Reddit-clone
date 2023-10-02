import React, { useState } from "react";
import { API } from "../utils/index.js";

export const Login = () => {
  const [formState, setFormState] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    console.log("Response:", response);
    if (data.success) {
      const { token } = data;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
      return setError(data.error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setFormState({ ...formState, [name]: e.target.value });
  };

  return (
    <>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Username: </label>
          <p>
            <input
              className="input"
              placeholder="Enter Username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="form-container">
          <label>Password: </label>
          <p>
            <input
              className="input"
              placeholder=" Enter Password"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </p>
          <button>Submit</button>
          <p>{error}</p>
        </div>
      </form>
    </>
  );
};

export default Login;
