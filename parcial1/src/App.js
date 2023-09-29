import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/Home';
import Login from  './views/Login';
import './App.css';
import CarDetail from './views/CarDetail';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/car/:carModel" element={<CarDetail />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
