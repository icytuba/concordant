import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import PostForm from './PostForm';

const EditPost = (props) => {
    const {post_id} = useParams();
    const [existingPostInfo, setExistingPostInfo] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleDateFormat = (unformattedDate) => {
        const htmlFormattedDate = new Date(unformattedDate).toISOString().slice(0, 10);
        return htmlFormattedDate;
        //converting what's now a Date object to ISO (e.g. 2023-04-10T04:00:00.000Z)
        //slicing first 10 (doesn't take 10th "index", so 0-9): YYYY-MM-DD
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/' + post_id, {withCredentials:true})
            .then(res => {
                let resBody = res.data;
                resBody = {...resBody, date: handleDateFormat(resBody.date)};
                setExistingPostInfo(resBody);
                setIsLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div className='mx-auto col-md-8'>
        {
            !isLoaded
            ? <></>
            : <PostForm submitType="edit" postBody={existingPostInfo} />
            
        }
        </div>
    )
}

export default EditPost;