//Web Server
require('dotenv').config();
const express = require("express");
const server = express();
const morgan = require('morgan');
const cors = require('cors');


// connect to the server
const PORT = process.env.PORT || 4000

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}!`)
  
    try {
      await client.connect()
      console.log('Database is open for business!')
    } catch (error) {
      console.error('Database is closed for repairs!\n', error)
    }
  })

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors')
server.use(cors())

// create logs for everything
const morgan = require('morgan')
server.use(morgan('dev'))

// handle application/json requests
server.use(express.json())

// here's our static files

// here's our API
server.use('/api', require('./api'))

// bring in the DB connection
const { client } = require('./db')


//export server and handle for routes/*.test.js
module.exports = {server,handle}