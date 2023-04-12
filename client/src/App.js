import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import TopNav from './components/TopNav';


function App() {
  return (
    <div className="App">
      <TopNav hasLoginLink={true} />
      <Routes>
        <Route path='/' element={<RegisterForm/>} />
        
      </Routes>
    </div>
  );
}

export default App;
