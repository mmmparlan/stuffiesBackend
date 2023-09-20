const express = require('express');
const apiRouter = express.Router();

const { getAllReviews, addReview, deleteReview, editReviewId } = require('../db/models/reviews');


apiRouter.get('/', async (req,res,next)=>{
    try{
    const allReviews = await getAllReviews();
    res.send(allReviews);
    }catch (error) {
        next(error);
    }
})

// POST - /api/reviews - create a new review
apiRouter.post('/', async (req, res, next) => {
    const {stuffyid,username,stuffyreview} = req.body;
    try {
        const stuffyReview = await addReview({stuffyid,username,stuffyreview});
        res.send(stuffyReview);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/reviews/:id - update a review by id
apiRouter.put('/:id', async (req, res, next) => {
    const {stuffyid,username,stuffyreview} = req.body;
    try {
        const reviewById = await editReviewId(req.params.id,{stuffyid,username,stuffyreview});
        res.send(reviewById);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/reviews/:id - delete a single board game by id
apiRouter.delete('/:id', async (req, res, next) => {
    try {
        const reviewById = await deleteReview(req.params.id);
        res.send(reviewById);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;