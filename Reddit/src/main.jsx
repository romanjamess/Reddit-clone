import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login.jsx';
import { Register } from './components/register.jsx';
import Createpost from './components/createPost.jsx';
import Home from './components/home.jsx';
import Subreddits from './components/subreddits.jsx';
import { SingleSubreddit } from './components/singleSubreddit.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     {path: "", element: <Home />},
     {path: "/login", element: <Login /> },
     {path: "/register", element: <Register /> },
     {path: "/post", element: <Createpost />},
     {path: "/subreddit", element: <Subreddits />},
     {path: "/subreddit/:subredditName", element: <SingleSubreddit/>},
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
