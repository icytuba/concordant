import React, {useState, useEffect} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import TopNav from './components/TopNav';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="">
      <UserProvider>
        <TopNav />
        <Routes>
          <Route path='/' element={<RegisterForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='dashboard' element={<Dashboard/>} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
