const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Description must be at least two characters"],
        maxlength: [256, "Description cannot be more than 256 characters"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [0, "Duration cannot be less than 0"],
        max: [24, "Duration cannot exceed 24 hours"]
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

/* more validations like date must be after today's date, maybe have possibility to have unlimited cowork invite...?
maybe have validation about having creator but isn't that on me(dev)? MAYBE something saying you can't update(controllers)
an old post?? (can't update an "invitation" to cowork if it's... I'm running into a problem here because whatshould 
the limit be on someone extending their time and not having to create a new post (it's been two hours since the user 
said they were done?)) */