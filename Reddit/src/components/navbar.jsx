import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setToken, setUser }) => {

  const handleLogout = () => {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <>
      <div>
        <nav className="nav-bar">
          <div id="left">
            {user && user.id ? (
              <>
                <Link to={"/"}>
                  <button onClick={handleLogout} to={"/"}>
                    Logout
                  </button>
                </Link>
                <Link to={"/"}>
                  <button>Home</button>
                </Link>
                <Link to={"/post"}>
                  <button>Post</button>
                </Link>
                <Link to={"/subreddit"}>
                  <button>Subreddit</button>
                </Link>
                <span>Welcome {user.username}</span>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <button>Register</button>
                </Link>
                <Link to={"/login"}>
                  <button>Login</button>
                </Link>
              </>
            )}
          </div>
          <div className="search">
            <form className="search-container">
              <input type="text" placeholder="Search" />
              <button type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
