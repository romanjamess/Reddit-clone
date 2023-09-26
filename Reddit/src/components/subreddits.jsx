import React, { useState } from "react";
import { API } from "../utils/index";
import { useOutletContext, useNavigate } from "react-router-dom";

const Subreddit = () => {
  const [formState, setFormState] = useState({ name: "" });
  const [error, setError] = useState("");
  const { token } = useOutletContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    if (data.error) {
      return setError(data.error);
    }
    setFormState(data.formState);
    console.log(data);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setFormState({ ...formState, [name]: e.target.value });
    console.log(formState);
  };
  return (
    <>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Name of your subreddit!</label>
          <p>
            <input
              className="input"
              placeholder="Enter Name"
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
            />
          </p>
        </div>
        <p>{error}</p>
      </form>
    </>
  );
};

export default Subreddit;
