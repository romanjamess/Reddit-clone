import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./utils/index";



function App() {
  const [token, setToken] = useState("");
  // console.log(token);
  const localToken = localStorage.getItem("token");
  console.log(localToken);

  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, [localToken]);
  console.log(token)
  
  async function fetchUser() {
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchUser();
  }, [token]);


  return (
    <>
      <Navbar />
      <Outlet context={{ setToken }}></Outlet>
    </>
  );
}

export default App;
