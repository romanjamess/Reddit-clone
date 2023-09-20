import React, { useState } from "react";

export const Login = () => {
  const [formState, setFormState] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
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
        localStorage.setItem("token", token);
        window.location.href = "/";
      } else {
        const data = await response.json();
       return setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error("Login failed", error);
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
