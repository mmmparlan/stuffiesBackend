const express = require('express');
const apiRouter = express.Router();

const { getAllCartItems, addItemToCart, deleteItemFromCart, editItemQuantityFromCart } = require('../db/models/shoppingCart');


apiRouter.get('/:id', async (req,res,next)=>{
    try{
    const fetchUserCart = await getAllCartItems(req.params.id);
    res.send(fetchUserCart);
    }catch (error) {
        next(error);
    }
})

// POST - /api/carts - add one item to your cart
apiRouter.post('/', async (req, res, next) => {
    const {userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity} = req.body;
    try {
        const itemToAddToCart = await addItemToCart({userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity});
        res.send(itemToAddToCart);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/carts/:id - update a cart by id
apiRouter.put('/:id', async (req, res, next) => {
    const {userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity} = req.body;
    try {
        const itemToUpdate = await editItemQuantityFromCart(req.params.id, {userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity});
        res.send(itemToUpdate);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/carts/:id - delete one item from cart
apiRouter.delete('/:id', async (req, res, next) => {
    try {
        const itemToDelete = await deleteItemFromCart(req.params.id);
        res.send(itemToDelete);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;