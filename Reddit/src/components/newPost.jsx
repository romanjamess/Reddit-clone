import React from "react";
import { useOutletContext } from "react-router-dom";
import "../assets/post.css";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { API } from "../utils/index.js";

const NewPost = () => {
  const { post, token , fetchPost} = useOutletContext();
  
  const handleUpvote = async (postId) => {
    const response = await fetch(`${API}/votes/upvotes/${postId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    });
    const data = await response.json();
    fetchPost();
    console.log(data);
  };


  return (
    <>
      <div className="post-container">
        {post.map((posts) => (
          <div className="reddit-post" key={posts.id}>
            <div className="post-header">
              <p className="subreddit">
                {posts.subreddit.name}/ {posts.user.username}
              </p>
            </div>
            <div className="display-likes">
              <div className="like-buttons">
                <div className="upVote">
                  <button
                    onClick={() => handleUpvote(posts.id)}
                    className="icon-button"
                  >
                    <BiUpvote />
                  </button>
                </div>
                <div className="downVote">
                  <button className="icon-button">
                    <BiDownvote />
                  </button>
                </div>
              </div>
              {posts.upvotes.length}
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
