import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const TopNav = (props) => {
    const {userId, setUserId} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials:true})
        .then(res => {
            console.log(res);
            setUserId("");
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="d-flex flex-row justify-content-between p-4">
            <h1 className='text-muted'>Concordant</h1>
            {
            userId
            ?
            <div>
                {/* <button className="btn btn-outline-secondary me-2" onClick={()=>{navigate('/profile')}}>My Profile</button> */}
                <button className="btn btn-outline-secondary" onClick={(e)=>{handleLogout(e)}}>Logout</button>
            </div>
            : null }
        </div>
    )
};

export default TopNav;
