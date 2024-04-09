import React from 'react';
import './App.css';
import AppRoute from "./route/appRoute";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
      <Router>
        <AppRoute/>
      </Router>
  );
}

export default App;
