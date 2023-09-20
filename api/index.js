const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { 
    createUser, 
    getAllUsers, 
    getUser, 
    getUserByUserName, 
    getUserById, 
    } = require('../db/models/users');

const {getAllStuffies, getStuffyById} = require('../db/models/stuffies');

const client = require('../db/client');
const { JWT_SECRET = 'neverTell'} = process.env;


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!'
  })
})

// place your routers here
apiRouter.use(async (req,res, next)=> {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth){
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const parsedToken = jwt.verify(token,JWT_SECRET);
            const id = parsedToken && parsedToken.id;
            if(id){
                req.user = await getUserById(id);
                next();
            }
        } catch (error) {
            next(error);
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});

apiRouter.use((req,res,next)=> {
    if (req.user) {
        console.log('user is set:', req.user);
    }
    next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const stuffiesRouter = require('./stuffies');
apiRouter.use('/stuffies', stuffiesRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

const cartsRouter = require('./carts');
apiRouter.use('/carts', cartsRouter);

module.exports = apiRouter;