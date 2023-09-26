import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="search">
        <form className="search-container">
          <input type="text" placeholder="create post" />
        </form>
      </div>
      <div className="post-container">
        <div className="post">
        </div>
      </div>
    </div>
  );
};

export default Home;
