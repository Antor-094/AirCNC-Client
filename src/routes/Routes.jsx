

import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
// import Home from "../Pages/Home";
// import Home from "../Pages/Home";



export const router = createBrowserRouter([
  {
    path:'/',
    element:<Main />,
    children:[
      {
        path:'/',
        element:<Home></Home>
      }
    ]
  },
  {
     path:'/login',
     element:<Login></Login>
  }
])