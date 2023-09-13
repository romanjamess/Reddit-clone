import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login.jsx';
import { Register } from './components/register.jsx';
import Post from './components/post.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     {path: "/login", element: <Login /> },
     {path: "/register", element: <Register /> },
     {path: "/post", element: <Post />}

    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
