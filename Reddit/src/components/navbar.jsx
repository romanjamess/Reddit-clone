import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="nav-bar">
        <div id="left">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/post"}>
            <button>Post</button>
          </Link>
        </div>
        <div className="search">
          <form className="search-container">
            <input type="text" placeholder="search" />
            <button type="submit">Search</button>
          </form>
        </div>
        <div id="right">
          <Link to={"/register"}>
            <button>register</button>
          </Link>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
