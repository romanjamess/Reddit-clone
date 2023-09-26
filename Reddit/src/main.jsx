import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login.jsx';
import { Register } from './components/register.jsx';
import Post from './components/post.jsx';
import Home from './components/home.jsx';
import Subreddits from './components/subreddits.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     {path: "", element: <Home />},
     {path: "/login", element: <Login /> },
     {path: "/register", element: <Register /> },
     {path: "/post", element: <Post />},
     {path: "/subreddit", element: <Subreddits />}
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
