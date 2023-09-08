const client = require('./client')
const {createInitUsers, createUser, getUser,getAllUsers,getUserByUserName,getUserById} = require('./models/users')
const {createStuffiesDatabase, addStuffyToDatabase, getAllStuffies, getStuffyById} =require('./models/stuffies')
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
  getStuffyById
  
}