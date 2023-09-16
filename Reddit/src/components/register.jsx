import React, { useState } from "react";
import { API } from "../utils/index";

export const Register = () => {
  const [formState, setFormState] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

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
      setError(data.error);
    }
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
      <form onSubmit={handleFormSubmit}>
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
        </div>
        <button>Submit</button>
      </form>
      <p>{error}</p>
      {console.log(formState)}
    </>
  );
};
