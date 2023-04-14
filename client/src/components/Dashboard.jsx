import React, {useContext} from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import { UserContext } from '../context/UserContext';

const Dashboard = (props) => {
    return (
        <div className='mx-auto col-md-8 '>
            <PostForm/>
        </div>
    )
};

export default Dashboard;