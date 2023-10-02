import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../utils/index.js";

const DeletePost = () => {
  const { postId } = useParams();
  const { token, fetchPosts, userId } = useOutletContext();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const canDelete = (post) => {
    // Check if the user is the author of the post
    return userId === post.userId;
  };

  useEffect(() => {
    const handleDeletePost = async () => {
      setIsDeleting(true);
      setError("");

      try {
        const res = await fetch(`${API}/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const info = await res.json();
        if (!info.success) {
          setError("An error occurred while deleting the post.");
        } else {
          fetchPosts();
          navigate("/");
          handleDeletePost();
        }
      } catch (error) {
        setError("An error occurred while deleting the post.");
      }

      setIsDeleting(false);
    };
  }, [postId, token, fetchPosts, navigate]);

  return (
    <div>
      <h1>Delete Post</h1>
      {isDeleting && <p>Deleting...</p>}
      {error && (
        <div>
          <p>{error}</p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
