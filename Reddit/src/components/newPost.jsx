import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../assets/post.css"; 

const NewPost = () => {
  const { token, post } = useOutletContext();

  return (
    <>
      <div className="post-container">
        {post.map((posts) => (
          <div className="reddit-post" key={posts.id}>
            <div className="post-header">
              <p className="subreddit">{posts.subreddit.name}/{posts.user.username}</p>
            </div>
            <h2 className="post-title">{posts.title}</h2>
            <p className="post-text">{posts.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewPost;
