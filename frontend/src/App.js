import './App.css';
import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ItemList from "./components/ItemList.js"
import UserItemList from './components/UserItemList';
import Home from './components/Home';
import NavBar from "./components/NavBar.js"

function App() {
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <Home />
    }, 
    {
      path: "/user",
      element: <UserItemList />,
    },
    {
      path: "/admin",
      element: <ItemList />,
    },
  ]);

  return (
      <div>
        <CssBaseline />
        <NavBar/>
        <Container maxWidth='xl'>
          <RouterProvider router={router} />
        </Container>
      </div>
  );
}

export default App;
