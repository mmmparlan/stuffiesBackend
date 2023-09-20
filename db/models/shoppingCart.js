const client = require('../client')




async function createInitCartsData(){
    console.log('Starting to create Carts...');
    try {
      const cartItemsToCreate = [
        { userid: '1', username: 'mark', stuffyid: '1', stuffyname: 'Plush Tulip', stuffyprice:'45', stuffyidquantity: '1' }
      ]
      const initCartItems = await Promise.all(cartItemsToCreate.map(addItemToCart));
  
      console.log('init carts data created:');
      console.log(initCartItems);
      console.log('Finished creating init cart data!');
    } catch (error) {
      console.error('Error creating cart data!');
      throw error;
    }
  
  }
  
  async function addItemToCart({userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity}){
    
    try{
      const {rows: [cartItem]} = await client.query(`
        INSERT INTO cart(userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity) VALUES ($1,$2,$3,$4,$5,$6)
        
        RETURNING id, username, stuffyid, stuffyname, stuffyprice, stuffyidquantity
      `, [userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity]);
      return cartItem;
    }catch (error) {
      throw error;
    }
  }

  async function deleteItemFromCart(cartId){
    try {
        const { rows: [cartItem] } = await client.query(`
        DELETE FROM cart
        WHERE id = $1
        RETURNING *
        `, [cartId]);

        return cartItem;
    } catch (error) {
        throw error;
    }
  }

  async function editItemQuantityFromCart(cartId,{userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity}){
    try {
        const {rows: [stuffyquantity]} = await client.query(`
        UPDATE cart
        SET userid = $2, username = $3, stuffyid = $4, stuffyname = $5, stuffyprice = $6,  stuffyidquantity = $7
        WHERE id = $1
        RETURNING *
        `,[cartId,userid,username,stuffyid,stuffyname,stuffyprice,stuffyidquantity])
        return stuffyquantity; 
    } catch (error) {
        throw error;
    }
  }

  async function getAllCartItems(userid) {
    /* this adapter should fetch a list of users from your db */
    console.log('getting all cart items for user')
      try {
        const {rows} = await client.query(`
        SELECT * FROM cart
        WHERE userid = $1
        `,[userid]);
        return rows;
      } catch (error) {
        throw error;
      }
  }



module.exports = {
    createInitCartsData,
    addItemToCart,
    deleteItemFromCart,
    editItemQuantityFromCart,
    getAllCartItems
}