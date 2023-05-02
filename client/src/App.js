import React, {useEffect} from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import TopNav from './components/TopNav';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import EditPost from './components/EditPost';
import AllPostsOneUser from './components/AllPostsOneUser';


function App() {
  const location = useLocation();
  const isRegistrationPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  useEffect(() => {
      if (isRegistrationPage || isLoginPage){
          document.body.classList.add('logreg-background');
      }
      else{
          document.body.classList.remove('logreg-background')
          document.body.classList.add('dashboard-bg')
      }
  },[isRegistrationPage])
  return (
    <div className="">
      <UserProvider>
        <TopNav />
        <Routes>
          <Route path='/' element={<RegisterForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/profile/:userIdOfPage' element={<AllPostsOneUser/>} />
          <Route path='/posts/edit/:post_id' element={<EditPost/>} />
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
