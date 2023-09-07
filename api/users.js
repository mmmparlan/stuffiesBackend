const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell'} = process.env;
const {requireUser} = require('./utils')
const { createUser, getAllUsers, getUser, getUserByUserName, getUserById} = require('../db');

apiRouter.post('/login', async (req,res,next)=> {
    const {username, password} = req.body;

    if(!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both a username and password'
        });
    }
    try {
        const user = await getUser({username,password});
        if(!user) {
            next({
                name: 'IncorrectCredentialsError',
                message: 'username or password is incorrect',
            })
        } else {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
            res.send({user, message:"you're logged in!", token});
        }
    } catch (error) {
        next(error);
    }
});

apiRouter.post('/register', async (req,res,next)=> {
    const {username,password} = req.body;
    try{
        
        const queriedUser = await getUserByUserName(username);
        if (queriedUser) {
            res.status(401);
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }else if (password.length < 8) {
            res.status(401);
            next({
                name: 'PasswordLengthError',
                message: 'Password Too Short!'
            });
        } else {
            const user = await createUser({
                username,
                password
            });
            if(!user) {
                next({
                    name: 'UserCreationError',
                    message: 'There was a problem registering you. Please try again.',
                });
            } else {
                const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
                res.send({user, message: "You're signed up!", token});
            }
        }
    } catch (error) {
        next(error)
    }
});

apiRouter.get('/me', requireUser, async (req,res,next)=> {
    try {
        res.send(req.user);
    } catch (error) {
        next(error)
    };
});

module.exports = apiRouter;