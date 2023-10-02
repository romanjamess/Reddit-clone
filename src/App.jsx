import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./utils/index";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [subreddits, setSubreddits] = useState([]);
  const [post , setPost] = useState([]);
  const localToken = localStorage.getItem("token", token);

  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, [localToken]);

  async function fetchUser(token) {
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
    }
  }

  async function fetchSubreddits() {
    const response = await fetch(`${API}/subreddits`);
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      setSubreddits(data.subreddits);
    }
  }


  async function fetchPost() {
    const response = await fetch(`${API}/posts`);
    const data = await response.json();
    // console.log(data);
    if(data.success) {
      setPost(data.posts);
    }
  }

  useEffect(() => {
    fetchUser(token);
    fetchSubreddits();
    fetchPost();
  }, [token]);

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{ setToken, user, token, fetchSubreddits, subreddits, fetchPost, post}}
      ></Outlet>
    </>
  );
}

export default App;
