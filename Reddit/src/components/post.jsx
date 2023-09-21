import React, { useState } from "react";

const Post = () => {
  const [formState, setFormState] = useState({ title: "", text: "" });
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/posts", {
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
    setFormState(data.formState);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setFormState({ ...formState, [name]: e.target.value });
  };
  return (
    <>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Title</label>
          <p>
            <input
              className="input"
              placeholder="Enter Title"
              name="title"
              type="text"
              id="title"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="form-container">
          <label>Text</label>
          <p>
            <input
              className="input"
              placeholder=" Enter Content"
              name="Content"
              type="text"
              id="Content"
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

export default Post;
