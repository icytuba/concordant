import React, {useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AllPostsByAllUsers = (props) => {
    const {userId} = useContext(UserContext);
    const {allPosts, setAllPosts, isDomLoaded, setIsDomLoaded} = props;
    const navigate = useNavigate();

    const dateHandler = (date => {
        let dateAsObject = new Date(date).toDateString();
        return dateAsObject;
    })
    useEffect(() => {
        axios.get('http://localhost:8000/api/posts', {withCredentials:true})
            .then(res => {
                console.log(res);
                const postsWithFormattedDate = res.data.map(post => {
                    post.date = dateHandler(post.date);
                    return post;
                });
                console.log(postsWithFormattedDate);
                setAllPosts(postsWithFormattedDate);
                setIsDomLoaded(true);
            })
            .catch(err => console.log(err));
    }, [isDomLoaded]);

    const handleDeleteBtn = (e, postId) => {
        axios.delete('http://localhost:8000/api/posts/' + postId, {withCredentials:true})
            .then(res => {
                console.log(res);
                setAllPosts(allPosts.filter(post => post._id !== postId))
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
        { isDomLoaded &&
            allPosts.map((post) => {
                let {description, date, duration, creator} = post;
                let name = creator.firstName + " " + creator.lastName;
                return(
                    <div className="card mt-3 mb-3 p-2" key={post._id}>
                        <div className="card-body">
                            <h5 className="bold"><Link to={`/profile/${creator._id}`}>{name}</Link></h5>
                            <p>
                                is working on <span className="bold">{description}</span> 
                            </p>
                            <p>
                                on <span className="bold">{date}</span> for <span className="bold">{duration}</span> hours.
                            </p>
                        </div>
                        {
                        creator._id == userId 
                        ? 
                        <div className="ms-auto p-2">
                            <button className="btn btn-outline-warning m-2" onClick={(e)=>{navigate(`/posts/edit/${post._id}`)}}>Edit</button>
                            <button className="btn btn-outline-danger" onClick={(e)=>{handleDeleteBtn(e, post._id)}}>Delete</button>
                        </div>
                        : null
                        }
                    </div>
                )
            })
        }
        </div>
    )
}

export default AllPostsByAllUsers;