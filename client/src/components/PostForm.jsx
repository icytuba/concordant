import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const PostForm = (props) => {
    const {userId} = useContext(UserContext);
    const [postInfo, setPostInfo] = useState({
        description: "",
        date: "",
        duration: "",
        creator: userId
    });
    const [errors, setErrors] = useState({});

    const handleValidations = (e) => {
        if(e.target.name == "description"){
            if(e.target.value.length < 1){
                setErrors({...errors, description: "Description is required"});
            }
            else if(e.target.value.length < 2){
                setErrors({...errors, description: "Description must be at least 2 characters"});
            } //interesting that using second if (instead of else if) wouldn't make first if register
            // ie the error would just keep saying <2 string response even when it should have been <1 one
            else if(e.target.value.length > 256){
                setErrors({...errors, description: "Description cannot exceed 256 characters"});
            }
            else {
                setErrors({...errors, description:""});
            }
        }
        if(e.target.name == "date")
            if(e.target.value.length < 0){
                setErrors({...errors, date: "Date is required"});
            }
            else{
                setErrors({...errors, date: ""});
            }
        if(e.target.name == "duration")
            if(e.target.value.length < 1){
                setErrors({...errors, duration: "Duration is required"});
            }
            else if(e.target.value < 0){
                setErrors({...errors, duration: "Duration cannot be less 0"});
            }
            else if(e.target.value > 24){
                setErrors({...errors, duration: "Duration cannot be greater than 24 hours"});
            }
            else{
                setErrors({...errors, duration: ""});
            }
    }

    const changeHandler = (e) => {
        setPostInfo({
            ...postInfo,
            [e.target.name]: e.target.value
        });
        console.log(postInfo)
        handleValidations(e);
        console.log(errors);
        console.log(props.userId);
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/posts', postInfo, {withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className="p-2 px-5 border">
            <form onSubmit={submitHandler}>
                <p className="mb-1">I'm working on</p>
                <textarea className="form-control mb-3" rows="2" name="description" onChange={changeHandler}></textarea>
                <div className="d-flex justify-content-between flex-wrap">
                    <div>
                        <div className="d-inline-block">
                            <label className="me-1 mb-1">on</label>
                            <input type="date" name="date" onChange={changeHandler} className="me-3 mb-3"/>
                        </div>
                        <div className="d-inline-block">
                            <label className="me-1 mb-1" htmlFor='duration'>for</label>
                            <input type="number" name="duration" onChange={changeHandler} className="me-1 mb-1"/> 
                            <label htmlFor='duration'className="mb-3 me-2">hours</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary ms-auto mb-3 align-self-end">Post Invitation</button>
                </div>
            </form>
        </div>
    )
};

export default PostForm;