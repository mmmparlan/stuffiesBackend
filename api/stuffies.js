const express = require('express');
const apiRouter = express.Router();
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET = 'neverTell'} = process.env;
// const {requireUser} = require('./utils');
const { getAllStuffies } = require('../db/models/stuffies');


apiRouter.get('/', async (req,res,next)=>{
    try{
    const stuffiesArray = await getAllStuffies();
    res.send(stuffiesArray);
    }catch (error) {
        next(error);
    }
})

module.exports = apiRouter;