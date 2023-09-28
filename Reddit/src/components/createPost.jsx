import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../utils/index";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const { token, subreddits, fetchPost } = useOutletContext();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text, // Corrected the order of text and title here
        title, // Corrected the order of text and title here
        subredditId,
      }),
    });
    const data = await response.json();

    if (data.success) {
      console.log(data);
      navigate(`/`);
      fetchPost();
    } else if (data.error) {
      setError(data.error);
    }
  };

  return (
    <>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Create Title</label>
          <p>
            <input
              className="input"
              placeholder="Enter title"
              name="title" // Corrected the name attribute to "title"
              type="text"
              id="title" // Corrected the id attribute to "title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <label>Create Text</label>
          <p>
            <input
              className="input"
              placeholder="Enter text"
              name="text" // Corrected the name attribute to "text"
              type="text"
              id="text" // Corrected the id attribute to "text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </p>
        </div>
        <div className="subreddit-list">
          <label>Select Subreddit</label>
          <p>
            <select onChange={(e) => setSubredditId(e.target.value)}>
              <option value="">Select a subreddit</option>
              {subreddits &&
                subreddits.map((subreddit) => (
                  <option key={subreddit.id} value={subreddit.id}>
                    {subreddit.name}
                  </option>
                ))}
            </select>
          </p>
        </div>
        <p>{error}</p>
        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
