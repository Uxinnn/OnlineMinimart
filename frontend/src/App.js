import './App.css';
import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ItemList from "./components/ItemList.js"
import UserItemList from './components/UserItemList';
import NavBar from "./components/NavBar.js"

function App() {
  return (
    <div>
      <CssBaseline />
      <NavBar/>
      <Container maxWidth='xl'>
        {/* <ItemList /> */}
        <UserItemList />
      </Container>
    </div>
  );
}

export default App;
