import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PostForm from './PostForm';
import AllPostsByAllUsers from './AllPostsByAllUsers';

const Dashboard = (props) => {
    const {userId} = useContext(UserContext);
    const [allPosts, setAllPosts] = useState([]);
    const [isDomLoaded, setIsDomLoaded] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("userId:", userId);
        if(!userId){
            navigate('/')
        }

    }, []);
    
    return (
        <div className='mx-auto col-md-8'>
            <PostForm allPosts={allPosts} setAllPosts={setAllPosts} isDomLoaded={isDomLoaded} setIsDomLoaded={setIsDomLoaded} submitType="create" />
            <AllPostsByAllUsers allPosts={allPosts} setAllPosts={setAllPosts} isDomLoaded={isDomLoaded} setIsDomLoaded={setIsDomLoaded}/>
        </div>
    )
};

export default Dashboard;