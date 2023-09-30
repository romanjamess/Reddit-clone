import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useOutletContext } from "react-router-dom";
import { API } from "../utils/index.js";

const Upvote = () => {
  const { post, token } = useOutletContext();

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
    console.log(data);
  };

  return (
    <>
      <div className="like-buttons">
        <div className="upVote">
          <button onClick={() => handleUpvote(post.id)} className="icon-button">
            <BiUpvote />
          </button>
        </div>
        <div className="downVote">
          <button className="icon-button">
            <BiDownvote />
          </button>
        </div>
      </div>
    </>
  );
};
export default Upvote;
