import React from "react";
import { Link } from "react-router-dom";
import NewPost from "./newPost";
import NewSubreddit from "./newSubreddit";

const Home = () => {
  return (
    <>
      <div className="subreddits-container">
        <NewSubreddit />
      </div>
      <div className="create-post">
        <Link to={"/post"}>
          <div className="create">
            <button className="button-create">+ Create Post</button>
          </div>
        </Link>
      </div>
      <NewPost />
    </>
  );
};

export default Home;
