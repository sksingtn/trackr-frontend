import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import { MainContainer } from "./components/Containers/Containers";
import Admin from "./components/Admin/Admin";

//TODO: Proptypes

function App() {
  return (
    <Router>
      <MainContainer>
        <Admin />
      </MainContainer>
    </Router>
  );
}

export default App;
