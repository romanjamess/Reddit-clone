import React from "react";
import { Link } from "react-router-dom";
import NewPost from "./newPost";

const Home = () => {
  return (
    <>
      <div className="create-post">
        <Link to={"/post"}>
          <div className="create">
            <button>+ Create Post</button>
          </div>
          
        </Link>
      </div>
      <NewPost />
    </>
  );
};

export default Home;
