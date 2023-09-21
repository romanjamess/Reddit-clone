import React, { useState } from "react";
import { API } from "../utils/index";
import { useOutletContext, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { setToken } = useOutletContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const data = await response.json();
    if (data.error) {
      return setError(data.error);
    }
    setToken(data.token);
    localStorage.setItem("token", data.token);
    navigate("/");
    console.log(data);
    console.log(formState);
    console.log("form submitted");
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
              type="firstName"
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
