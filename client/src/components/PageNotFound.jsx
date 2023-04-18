import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PageNotFound = (props) => {
    const navigate = useNavigate();

    return(
        <div className="text-center">
            <h3 >Page Not Found</h3>
            <Link to='/dashboard'>Go back home</Link>
        </div>
    )
}
export default PageNotFound;