const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports = {
    createPost: (req, res) => {
        Post.create(req.body)
            .then(newPost => {
                User.findByIdAndUpdate(newPost.creator, {$push: {posts: newPost._id}})
                    .then(() => console.log("Successfully added post to creator"))
                    .catch((err) => res.json(err));
                res.json(newPost)
            })
            .catch(err => res.status(400).json(err));
    },
    getAllPosts: (req, res) => {
        Post.find({}).populate("creator").sort({updatedAt:-1})
            .then(allPosts => res.json(allPosts))
            .catch(err => res.status(400).json(err));
    },
    getOnePost: (req, res) => {
        Post.findById(req.params.id)
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
    },
    updatePost: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
            .then(updatedPost => res.json(updatedPost))
            .catch(err => res.status(400).json(err));
    },
    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => res.status(200).json({message: "success", deletedPost: deletedPost}))
            .catch(err => res.status(400).json(err))
    }
}

// pass cookie with each? look up how and if this is necessary (more specifically, if this is where I should do it)
// ^ automatic via cookie-parser?