//Web Server
const express = require("express");
const server = express();

require('dotenv').config();


// connect to the server
const PORT = process.env.PORT || 4000

// bring in the DB connection
const client = require('./db/client')
//console.log(client)

// here's our API
server.use('/api', require('./api'))

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors')
server.use(cors())

// create logs for everything
const morgan = require('morgan')
server.use(morgan('dev'))

// handle application/json requests
server.use(express.json())

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}!`)
    //console.log(process.env)
  
    try {
        console.log('trying db connection')
      await client.connect()
      console.log('Database is open for business!')
    } catch (error) {
      console.error('Database is closed for repairs!\n', error)
    }
  })



// here's our static files
server.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})



//404 handler
server.get('*',(req,res)=> {
    res.status(404).send({error: '404 - NOT FOUND', message: 'No route found for the requested URL'});
});

//error handling middleware
server.use((error,req,res,next)=> {
    console.error('SERVER ERROR: ', error);
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name:error.name, message: error.message, table: error.table});
});



//export server and handle for routes/*.test.js
module.exports = {server,handle}