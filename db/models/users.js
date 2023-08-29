// grab our db client connection to use with our adapters
const client = require('../client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createInitUsers(){
  
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'mark', password: 'mark123' },
      { username: 'skyla', password: 'skyla123' },
      { username: 'scarlett', password: 'scarlett123' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }

}

async function createUser({username,password}){
  const hashedPassword = await bcrypt.hash(password,SALT_COUNT);
  try{
    const {rows: [user]} = await client.query(`
      INSERT INTO users(username,password) VALUES ($1,$2)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username
    `, [username, hashedPassword]);
    return user;
  }catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  console.log('getting all users')
    try {
      const {rows} = await client.query(`
        SELECT * FROM users;
      `);
      return rows;
    } catch (error) {
      throw error;
    }
}

async function getUser({username,password}) {
  if (!username || !password){
    return;
  }

  try {
    const user = await getUserByUserName(username);
    if(!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  };
};

async function getUserByUserName(userName) {
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [userName]);

    if (!rows || !rows.length) return null;

    const [user] = rows;
    return user;
  } catch (error) {
    console.error(error);
  };
};

async function getUserById(userId){
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `,[userId]);

    if(!user) return null;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createInitUsers,
  createUser,
  getUser,
  getUserByUserName,
  getUserById
}