import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = (props) => {


    return(
        <div className="d-flex flex-row justify-content-between p-4">
            <h1 className='text-muted'>Concordant</h1>
            {props.hasLoginLink ? <Link to="/login">Log In</Link> : null }
            
        </div>
    )
};

export default TopNav;