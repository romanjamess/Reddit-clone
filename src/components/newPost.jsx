import React from "react";
import { useOutletContext } from "react-router-dom";
import "../assets/post.css";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { API } from "../utils/index.js";

const NewPost = () => {
  const { post, token, fetchPost, user } = useOutletContext();

  const handleUpvote = async (postId) => {
    const postToUpdate = post.find((p) => p.id === postId);

    if (!postToUpdate) {
      console.error("Post not found");
      return;
    }

    const likeIndex = postToUpdate.upvotes.find(
      (upvote) => upvote.userId === user.id
    );

    if (likeIndex === -1) {
      // If the user has already liked the post, remove the like
      const response = await fetch(`${API}/votes/upvotes/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postToUpdate.id,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchPost();
    } else {
      // If the user hasn't liked the post, add a new like
      const response = await fetch(`${API}/votes/upvotes/${postId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postToUpdate.id,
        }),
      });

      const data = await response.json();
      console.log(data);
      fetchPost();
    }
  };

  const handleDownvote = async (postId) => {
    const postToUpdate = post.find((p) => p.id === postId);
  
    if (!postToUpdate) {
      console.error("Post not found");
      return;
    }
  
    const upvoteIndex = postToUpdate.upvotes.findIndex((upvote) => upvote.userId === user.id);
  
    if (upvoteIndex !== -1) {
      // If the user has already upvoted the post, remove the upvote
      const response = await fetch(`${API}/votes/upvotes/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postToUpdate.id,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchPost();
    }
  
    // Now you can proceed to add a downvote
    const response = await fetch(`${API}/votes/downvotes/${postId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: postToUpdate.id,
      }),
    });
  
    const data = await response.json();
    console.log(data);
    fetchPost();
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
                  <button
                    onClick={() => handleDownvote(posts.id)}
                    className="icon-button"
                  >
                    <BiDownvote />
                  </button>
                </div>
              </div>
              Likes: {posts.upvotes.length - posts.downvotes.length}
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