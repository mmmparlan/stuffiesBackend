//connection to DB
const {Client} = require('pg');

const DB_NAME = 'stuffies';

const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`

const client = new Client(DB_URL);

// for deployment on Render.io you will need to create options in Client() for password, user, and host

module.exports = client

// user: "postgres",
// host: "localhost",
// database: "stuffies",
// password: "postgres",
// port: 5432,