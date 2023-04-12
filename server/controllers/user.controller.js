const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser){
                res.status(400).json({message: "Email already exists"});
            } else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id: newUser.id, email: newUser.email}, secret, {expiresIn: "1d"});
                res.cookie('usertoken', userToken, { //pay attention to above _id vs id
                    httpOnly: true
                }).json({message: "success", user: newUser});
            }
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if (passwordMatch){
                    const userToken = jwt.sign({_id:user.id, email:user.email}, secret, {expiresIn: "1d"});
                    res.cookie('usertoken', userToken, {
                        httpOnly: true
                    }).json({message: "success", user: user, lookAtThisID: user.id});//user.id & user._id both work??
                    console.log('token:', userToken)
                } else {
                    res.status(400).json({message: "Invalid login attempt"});
                }
            } else {
                res.status(400).json({message: "Invalid login attempt"});
            }
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // logout: (req, res) => {
    //     res.clearCookie("usertoken")
    //         .then(() =res.json({message:"success"}))
    //         .catch(err => res.status(400).json(err))
    // }, //this doesn't work! throws error saying res.clearCookie(...) isn't a function
    // BUT when I do res.clearCookie("usertoken").json({message:"success"}) with no async or catch 
    //it works fine?? still just gonna use the async await below

    logout: async (req,res) => {
        try {
            res.clearCookie("usertoken").json({message:"success"});
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    getAllUsers: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err));
    },
    getOneUser: (req,res) => {
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(400).json(err))
    },
    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(deletedUser => res.json({deletedUser: deletedUser}))
            .catch(err => res.status(400).json(err))
    },

    getAllPostsByUser: (req, res) => {
        User.findById(req.params.userId)
            .populate({
                path: "posts",
                options:{
                    sort: "-updatedAt"
                }
            })
            .then(userWithPosts => res.json(userWithPosts)) //consider separating posts (userWithPosts.posts)
            .catch(err => res.json(err));   // also sort by updatedAt desc, whenever I get to this
    } 
    /* does this need to be a separate api call/route? in the long run I think there could be a ton of posts
    for each user and if I only wanted to get their information to update it, it would be a waste to have
    to process and sort through all their posts that won't be shown on that page */
}