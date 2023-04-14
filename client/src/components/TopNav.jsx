import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const TopNav = (props) => {
    const {userId} = useContext(UserContext);

    return(
        <div className="d-flex flex-row justify-content-between p-4">
            <h1 className='text-muted'>Concordant</h1>
            { userId ? <Link to="/logout">Log Out</Link> : null } 
            
        </div>
    )
};

export default TopNav;
