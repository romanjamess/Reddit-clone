import React from "react";
import { Link } from "react-router-dom";
import { BsReddit } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import "../assets/navbar.css";

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
                <div className="reddit-logo">
                  <BsReddit />
                </div>

                <Link to={"/"}>
                  <button onClick={handleLogout} to={"/"}>
                    Logout
                  </button>
                </Link>
                <Link to={"/"} className="home-link">
                  <div className="home-button">
                    <HiHome className="home-icon" />
                  </div>
                </Link>
                <Link to={"/subreddit"}>
                  <button>Subreddit</button>
                </Link>
                <span>Welcome {user.username}</span>
              </>
            ) : (
              <>
              <div className="reddit-logo">
                  <BsReddit />
              </div>
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
