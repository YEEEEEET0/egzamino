const express = require('express');
const userRouter = express.Router();
const {
    register,
    login,
    info,
    logout
} = require('../controllers/user');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/info', info);
userRouter.get('/logout', logout);

module.exports = userRouter;