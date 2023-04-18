import React, {useState, useContext, useEffect} from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';
import { UserContext } from '../context/UserContext';

const PostForm = (props) => {
    const navigate = useNavigate();
    const {userId} = useContext(UserContext);
    const {submitType, postBody, allPosts, setAllPosts, setIsDomLoaded} = props;
    const [postInfo, setPostInfo] = useState({
        description: "",
        date: "",
        duration: "",
        creator: userId
    });

    useEffect(() => {
        if(postBody){
            setPostInfo(postBody);
        }
    }, [])

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
            if(e.target.value == null){
                setErrors({...errors, date: "Date is required"});
            }
            else{
                setErrors({...errors, date: ""});
            }
        if(e.target.name == "duration") //if not a number
            if(e.target.value.length < 1){
                setErrors({...errors, duration: "Duration is required"});
            }
            else if(e.target.value < 0){
                setErrors({...errors, duration: "Duration cannot be less 0"});
            }
            else if(parseFloat(e.target.value) == NaN){
                console.log("yes not number but wtheck")
                setErrors({...errors, duration: "Duration must be a number"}); // can't get this one to work (tried typeof(parseFloat()) too)
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
        console.log(parseFloat(e.target.value));
        handleValidations(e);
        console.log("errorstate:", errors);;
    };
    
    const submitHandler = (e, submitType) => {
        e.preventDefault();
        console.log("button clicked")
        if(postInfo.date == ""){ //should I put them all here in order? if !description if !date if !duration ???
            return (setErrors({...errors, date: "Date is required"}))
        }
        else if(errors.description || errors.date || errors.duration){
            console.log("errors")
            return null
        }
        else if(submitType=="create"){
            axios.post('http://localhost:8000/api/posts', postInfo, {withCredentials: true})
                .then(res => {
                    console.log(res)
                    setAllPosts([...allPosts, res.data]);
                    setIsDomLoaded(false);
                    console.log(allPosts);
                })
                .catch(err => console.log(err));
        }
        else if(submitType=="edit"){
            axios.patch('http://localhost:8000/api/posts/' + postInfo._id , postInfo, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    navigate('/');
                })
                .catch(err => console.log(err));
        } else {
            return null
        }
    }

    return (
        <div className="p-4 border">
            <form onSubmit={(e) => {submitHandler(e, submitType)}}>
                <p>I'm working on</p>
                { errors.description ? <span className="text-danger">{errors.description}</span> : ""}
                <textarea className="form-control mb-3 mt-2" rows="2" name="description" onChange={changeHandler} value={postInfo.description}></textarea>
                <div className="d-flex justify-content-between flex-wrap">
                    <div>
                        <div className="d-inline-block">
                            <label className="me-2 mb-1">on</label>
                            <input type="date" name="date" onChange={changeHandler} value={postInfo.date} className="me-3 mb-3" />
                        </div>
                        <div className="d-inline-block">
                            <label className="me-2 mb-1" htmlFor='duration'>for</label>
                            <input type="text" name="duration" onChange={changeHandler} value={postInfo.duration} className="me-2 mb-1" size="2" /> 
                            <label htmlFor='duration'className="mb-3 me-2">hours</label>
                        </div>
                        {/* { errors.date ? <span className="text-danger">{errors.date}</span> : ""}
                        { errors.duration ? <span className="text-danger">{errors.duration}</span> : ""} */}
                    </div>
                    <div>
                        <div className="mb-1">
                            { errors.date ? <p className="text-danger m-0">{errors.date}</p> : ""}
                            { errors.duration ? <p className="text-danger m-0">{errors.duration}</p> : ""}
                        </div>
                        <button type="submit" className="btn btn-outline-secondary ms-auto mb-3 align-self-end">Post Invitation</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default PostForm;