import React, { useState } from "react";

export const Register = () => {
  const [formState, setFormState] = useState({ userName: "", password: "" });

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    console.log(data);
    console.log(formState);
    console.log("form submitted");

  };

  const handleChange = (e) => {
    const name = e.target.name 
    setFormState({ ...formState, [name]: e.target.value });
  };

  return (
    <>
    <form onSubmit={handleFormSubmit} >
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
      {console.log(formState)}
    </>
  );
};
