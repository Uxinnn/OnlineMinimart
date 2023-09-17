import './App.css';
import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NavBar from "./components/NavBar"
import AdminPage from "./pages/AdminPage"
import UserPage from './pages/UserPage';
import Home from './pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <Home />
    }, 
    {
      path: "/user",
      element: <UserPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
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
