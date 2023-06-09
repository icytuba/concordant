const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/users', authenticate, UserController.getAllUsers); //tested
    app.post('/api/users/register', UserController.register); //tested
    app.post('/api/users/login', UserController.login); //tested
    app.post('/api/users/logout', authenticate, UserController.logout); //tested
    app.get('/api/users/auth', authenticate, UserController.loggedInUserId);
    app.get('/api/users/:id', authenticate, UserController.getOneUser); //tested
    app.put('/api/users/:id', authenticate, UserController.updateUser); //tested BUT can't hash changed password yet
    app.delete('/api/users/:id', authenticate, UserController.deleteUser); //tested
    app.get('/api/users/posts/:userId', authenticate, UserController.getAllPostsByUser); //tested
}

//make sure that user can only update or delete their own account and not anyone else's 
//I know I can do make this happen on the front end but I think it'd still be important on the back (backlog?)