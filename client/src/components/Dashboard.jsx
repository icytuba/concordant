import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, uuseNavigate} from 'react-router-dom';
import PostForm from './PostForm';
import { UserContext } from '../context/UserContext';

const Dashboard = (props) => {
    const {userId, isAuthorized} = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("userId:", userId);
        if(!userId){
            navigate('/')
        }
    }, []);
    return (
        <div className='mx-auto col-md-8 '>
            <PostForm/>
        </div>
    )
};

export default Dashboard;