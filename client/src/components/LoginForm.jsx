import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginForm = (props) => {
    const navigate = useNavigate();
    const {userId, setUserId} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [apiError, setApiError] = useState();

    // useEffect(() => {
    //     axios.get()
    //     }
    // }, [])

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setApiError(''); // should I clear apiError state once they make a change after the error message shows up?
    };

    const submitHandler =(e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
            .then(res => {
                console.log(res); //remove this to keep info away from public
                setUserId(res.data.user._id);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
                setApiError(err.response.data.message);
            })
    };

    return (
        <div className="text-center">
            <h3>Login</h3>
            <form className="form col-md-4 mx-auto" onSubmit={submitHandler}>
                <div className="form-group mt-3">
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={(e)=>changeHandler(e)}/>
                </div>
                <div className="form-group mt-3">
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={(e)=>changeHandler(e)}/>
                </div>
                { apiError ? <div className="text-danger mt-1">{apiError}</div> : "" }
                <button type="submit" className="btn btn-outline-primary form-group mt-3">Log In</button>
            </form>
            <p className="mt-2 mb-0">Don't have an account?</p><Link to='/'> Register</Link>
        </div>
    )
}

export default LoginForm;