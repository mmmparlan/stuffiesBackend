const client = require('./client')
const {createInitUsers, createUser, getUser,getAllUsers,getUserByUserName,getUserById} = require('./models/users')
const {createStuffiesDatabase, addStuffyToDatabase, getAllStuffies, getStuffyById} = require('./models/stuffies')
const {getAllCartItems, createInitCartsData, addItemToCart, deleteItemFromCart, editItemQuantityFromCart} = require('./models/shoppingCart')
const {getAllReviews,createInitReview, addReview, deleteReview,editReviewId} = require('./models/reviews')
//const {} = require('./models/stuffies')
// user model imports between {} above
module.exports = {
  client,
  // user model imports here
  createInitUsers,
  createUser,
  getUser,
  getAllUsers,
  getUserByUserName,
  getUserById,
  createStuffiesDatabase,
  addStuffyToDatabase,
  getAllStuffies,
  getStuffyById,
  createInitCartsData,
  addItemToCart,
  deleteItemFromCart,
  getAllCartItems,
  editItemQuantityFromCart,
  createInitReview,
  addReview,
  deleteReview,
  editReviewId,
  getAllReviews
  
}