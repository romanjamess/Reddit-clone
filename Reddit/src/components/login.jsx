import React, { useState } from "react";

export const Login = () => {
  const [formState, setFormState] = useState({ userName: "", password: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      console.log("logged in");

      // Store the token securely (e.g., in localStorage or sessionStorage)
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
      res.send({
        success: false,
        message: "Authentication failed! Please check the request",
      })
      console.error("Login failed");
      console.log("helo");
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
        </div>
      </form>
    </>
  );
};

export default Login;
