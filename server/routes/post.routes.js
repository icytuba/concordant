const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/posts', authenticate, PostController.getAllPosts); //tested
    app.post('/api/posts', authenticate, PostController.createPost); //tested
    app.get('/api/posts/:id', authenticate, PostController.getOnePost); //tested
    app.patch('/api/posts/:id', authenticate, PostController.updatePost); //tested (working like patch it seems like)
    app.delete('/api/posts/:id', authenticate, PostController.deletePost); //tested
}