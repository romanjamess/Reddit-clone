import React, { useState, useEffect } from "react";
import { API } from "../utils/index";
import { useOutletContext, useNavigate } from "react-router-dom";

const Subreddit = () => {
  const [formState, setFormState] = useState({ name: "" });
  const [error, setError] = useState("");
  const { token, subreddits } = useOutletContext(); // Get subreddits from context


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

    if (data.success) {
      setFormState({ name: "" });
      console.log(data);
    } else if (data.error) {
      return setError(data.error);
    }
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
              value={formState.name}
              onChange={handleChange}
            />
          </p>
        </div>
        <p>{error}</p>
      </form>

      {/* Render the list of subreddits */}
      <div className="subreddit-list">
        <h2>List of Subreddits:</h2>
        <ul>
          {subreddits && subreddits.map((subreddit) => (
            <li key={subreddit.id}>{subreddit.name}</li>
          ))}
        </ul>
      </div>
      {console.log(subreddits)}
    </>
  );
};

export default Subreddit;
