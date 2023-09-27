import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../utils/index";

const Post = () => {
  const [post , setPost] = useState([])
  const { token, } = useOutletContext(); // Get subreddits from context

  useEffect(() => {
    fetchPost();
  },[token])

  async function fetchPost() {
    const response = await fetch(`${API}/posts`);
    const data = await response.json();
    console.log(data);
    if(data.success) {
      setPost(data.posts);
    }
    console.log(data);
  }


  return (
    <>
    <div className="subreddit-list">
        <h2>posttt</h2>
        <ul>
          {post.map((posts) => (
            <li key={posts.id}>{posts.title}{posts.subreddit.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Post;
