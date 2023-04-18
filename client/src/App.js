import React, {useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import TopNav from './components/TopNav';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import EditPost from './components/EditPost';

function App() {

  return (
    <div className="">
      <UserProvider>
        <TopNav />
        <Routes>
          <Route path='/' element={<RegisterForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/posts/edit/:post_id' element={<EditPost/>} />
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
