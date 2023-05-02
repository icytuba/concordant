import React, {useState, useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AllPostsOneUser = (props) => {
    const {userId} = useContext(UserContext);
    const {userIdOfPage} = useParams();
    const [userOnPage, setUserOnPage] = useState({});
    const [allPosts, setAllPosts] = useState([]);
    const [isDomLoaded, setIsDomLoaded] = useState(false);
    const navigate = useNavigate();

    const dateHandler = (date => {
        let dateAsObject = new Date(date).toDateString();
        return dateAsObject;
    })
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/posts/'+ userIdOfPage, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                setUserOnPage({
                    fullName: res.data.firstName + ' ' + res.data.lastName,
                    _id: res._id
                });
                const postsWithFormattedDate = res.data.posts.map(post => {
                    post.date = dateHandler(post.date);
                    return post;
                });
                // console.log(postsWithFormattedDate);
                setAllPosts(postsWithFormattedDate);
                setIsDomLoaded(true);
            })
            .catch(err => console.log(err));
    }, [isDomLoaded, userIdOfPage]);

    const handleDeleteBtn = (e, postId) => {
        axios.delete('http://localhost:8000/api/posts/' + postId, {withCredentials:true})
            .then(res => {
                console.log(res);
                setAllPosts(allPosts.filter(post => post._id !== postId))
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="mx-auto col-md-8">
            <h4 className="mt-2 card text-center">{userOnPage.fullName}'s Co-working Invitations</h4>
            { isDomLoaded &&
                allPosts.map((post) => {
                    let {description, date, duration} = post;
                    return(
                        <div className="card mt-3 mb-3 p-2" key={post._id}>
                            <p className="card-body">
                                <span className="bold">{userOnPage.fullName}</span> is working on <span className="bold">{description}</span> on <span className="bold">{date}</span> for <span className="bold">{duration}</span> hours.
                            </p>
                            {
                            userIdOfPage == userId
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

export default AllPostsOneUser;