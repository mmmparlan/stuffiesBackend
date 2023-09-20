const client = require('./client');

  const {
    createInitUsers
   } = require('./models/users')

   const {
    createStuffiesDatabase
   } = require('./models/stuffies')

   const {createInitCartsData} = require('./models/shoppingCart')

   const {createInitReview} = require('./models/reviews')
  
  async function buildTables() {
    try {
        console.log('trying buildTables in init_db.js')
        client.connect()
  
        // drop tables in correct order to make sure you are always starting afresh
        console.log('dropping all tables...');
        await client.query(`
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS stuffies;
        DROP TABLE IF EXISTS users;
        `);
        // build tables in correct order
        console.log('building tables...');
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )
        `);
        await client.query(`
        CREATE TABLE stuffies(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            size VARCHAR(255) NOT NULL,
            colors VARCHAR(255) NOT NULL,
            imageUrl1 VARCHAR(255) NOT NULL,
            imageUrl2 VARCHAR(255)
        )
        `);
        await client.query(`
        CREATE TABLE cart(
          id SERIAL PRIMARY KEY,
          userid INTEGER,
          username VARCHAR(255),
          stuffyid INTEGER NOT NULL,
          stuffyname VARCHAR(255) NOT NULL,
          stuffyprice INTEGER NOT NULL,
          stuffyidquantity INTEGER NOT NULL
        )
        `);
        await client.query(`
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          stuffyid INTEGER NOT NULL,
          username VARCHAR(255),
          stuffyreview TEXT NOT NULL
        )
        `);
    } catch (error) {
      throw error
    }
  }
  
  async function populateInitialData() {
    try {
      // create useful starting data by leveraging your
      // Model.method() adapters to seed your db, for example:
      // const user1 = await User.createUser({ ...user info goes here... })
      console.log('creating initial users');
      await createInitUsers();

      console.log('creating stuffies table');
      await createStuffiesDatabase();

      console.log('creating initial carts data');
      await createInitCartsData();

      console.log('creating inital review data');
      await createInitReview();
      
      
    } catch (error) {
      throw error
    }
  }
  
  buildTables()
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end())