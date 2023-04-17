import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const RegisterForm = (props) => {
    const navigate = useNavigate();
    const {userId, setUserId} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [apiErrors, setApiErrors] = useState();

    useEffect(() => {
        if (userId){
            navigate('/dashboard')
        }
    }, [])


    const handleValidations = (e) => {
        if(e.target.name == "firstName"){
            if(e.target.value.length < 1){
                setErrors({...errors, firstName: "First name is required"});
            }
            else if(e.target.value.length < 2){
                setErrors({...errors, firstName: "First name must be at least 2 characters"});
            } //interesting that using second if (instead of else if) wouldn't make first if register
            // ie the error would just keep saying <2 string response even when it should have been <1 one
            else {
                setErrors({...errors, firstName:""});
            }
        }
        if(e.target.name == "lastName"){
            if(e.target.value.length < 1){
                setErrors({...errors, lastName: "Last name is required"});
            }
            else if(e.target.value.length < 2){
                setErrors({...errors, lastName: "Last name must be at least 2 characters"});
            }
            else {
                setErrors({...errors, lastName:""});
            }
        }
        if(e.target.name == "email"){
            if(e.target.value.length < 1){
                setErrors({...errors, email: "Email is required"});
            }
            else if(e.target.value.length < 2){
                setErrors({...errors, email: "Email must be at least 2 characters"});
            }
            else {
                setErrors({...errors, email:""});
            }
        }
        if(e.target.name == "password"){
            if(e.target.value.length < 1){
                setErrors({...errors, password: "Password is required"});
            }
            else if(e.target.value.length < 8){
                setErrors({...errors, password: "Password must be at least 8 characters"});
            }
            else {
                setErrors({...errors, password:""});
            }
        }
        if(e.target.name == "confirmPassword"){
            if(e.target.value.length < 1){
                setErrors({...errors, confirmPassword: "Password must be confirmed"});
            }
            else if(e.target.value !== userInfo.password){
                setErrors({...errors, confirmPassword: "Passwords must match"});
            }
            else {
                setErrors({...errors, confirmPassword:""});
            }
        }
    }
    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        handleValidations(e);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', userInfo, {withCredentials: true})
            .then(res => {
                console.log(res.data.user._id);
                setUserId(res.data.user._id);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.message == "Email already exists") //this could be bad practice but it's the only backend
                setApiErrors(err.response.data.message);                // error I care about showing, and if I dont do == then
                console.log(apiErrors);                                 // all the errors show when I have an empty, untouched form and submit
            })
    };
    
    return (
        <div className="text-center">
            <h3>Register</h3>
            <form className="form col-md-4 mx-auto" onSubmit={submitHandler}>
                <div className="form-group mt-3">
                    { errors.firstName ? <span className="text-danger">{errors.firstName}</span> : "" }
                    <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={(e)=>changeHandler(e)}/>
                </div>
                <div className="form-group mt-3">
                    { errors.lastName ? <span className="text-danger">{errors.lastName}</span> : "" }
                    <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={(e)=>changeHandler(e)}/>
                </div>
                <div className="form-group mt-3">
                    { errors.email ? <span className="text-danger">{errors.email}</span> : "" }
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={(e)=>changeHandler(e)}/>
                </div>
                <div className="form-group mt-3">
                    { errors.password ? <span className="text-danger">{errors.password}</span> : "" }
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={(e)=>changeHandler(e)}/>
                </div>
                <div className="form-group mt-3">
                    { errors.confirmPassword ? <span className="text-danger">{errors.confirmPassword}</span> : "" }
                    <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={(e)=>changeHandler(e)}/>
                </div> 
                { apiErrors ? <div className="text-danger mt-1">{apiErrors}</div> : "" }

                { 
                errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword || errors == {}
                    ?
                    <button type="submit" className="btn btn-outline-primary form group mt-3" disabled>Register</button>
                    : 
                    <button type="submit" className="btn btn-outline-primary form-group mt-3">Register</button>
                }
            </form>
            <p className="mt-2 mb-0">Already have an account?</p><Link to='/login'> Log in</Link>
        </div>
    );
};

export default RegisterForm;

//tested, does register w/o validations
//tested with validations but very minimal css, and I want spacing between inputs to remain constant with/without error


//need to add api call?? to see if email already exists (on submit?)
//need to make register button disabled when page is laoded and no changes to form & 0 inputs
//try isValid and maybe don't worry about disabling button but instead just changling the submit handler

// reeeeally need to refactor/modularize but not sure about most efficient way yet

