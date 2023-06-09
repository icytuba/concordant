import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userId, setUserId] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    // const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const verifyUserLoggedIn = async () => {
            try {
                const apiResult = await axios.get('http://localhost:8000/api/users/auth', {withCredentials:true});
                setUserId(apiResult.data._id);
            }
            catch(err) {
                console.log("Context error:", err);
            }
            finally {
                setIsLoaded(true);
            }
        }
        if(!userId){
            verifyUserLoggedIn();
        }
    }, [])

    return (
        <UserContext.Provider value = {{userId, setUserId}}>
            {
            !isLoaded
            ? <></>
            :props.children
            }
        </UserContext.Provider>
    )
}

// useContext is the hook that's used to grab what's in the provider, so import UserContext into the 
// components you want to give these context values to (UserProvider wraps the components in App.js
// /the routes in App.js)

// could do directly in app.js I guess, and it would look like what's in this here return for UserProvider
// but this is a cleaner way to do it I htink




/*
IMPORTANT!
Change this context from the user id to isLoggedIn which will make an api call to see if there's a login cookie
BUT if I'm not making logged in user id available in context, how do i conditionally render things like edit post button
in front end if the post belongs to that user
-- is there a way to avoid having id on front end (and is this even important to hide) and still render conditionally 
without having to do an api call and jwt decode on evey single post that would show up on dashboard?
*/

/*
4/16 (most recent comment last):
I think I can refactor so that each private component doesn't have to include the if (!userId) redirect to '/'
By wrapping all the private routes in... a different context? I dont think different context wrapper is the idea
because they all should have access to the logic about whether there is or isnt a logged in user

maybe!! if loaded && !userId ... load register component? or can i route to it somehow
*/