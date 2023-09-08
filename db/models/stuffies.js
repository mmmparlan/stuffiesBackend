const client = require('../client')

async function createStuffiesDatabase(){
    console.log('Starting to add stuffies into database...');
    try {
      const stuffiesToAddToDatabase = [
        { name: 'Plush Tulip', price: 45, size: 'Medium', colors: 'Green and Light Orange', imageUrl1: '../models/plush_tulip.jpg', imageUrl2: '' },
        { name: 'Plush Tulip', price: 45, size: 'Medium', colors: 'Green and Purple', imageUrl1: '../models/plush_tulip.jpg', imageUrl2: ''},
        { name: 'Plush Tulip', price: 45, size: 'Medium', colors: 'Green and Light Purple', imageUrl1: '../models/plush_tulip.jpg', imageUrl2: ''},
        { name: 'Limited Edition Plush Pinky Octopus', price: 12, size: 'Small', colors: 'Yellow', imageUrl1: '../models/plush_small_pinky_octopus_limited_edition.jpg', imageUrl2: ''},
        { name: 'Limited Edition Plush Pinky Octopus', price: 12, size: 'Small', colors: 'Pink', imageUrl1: '../models/plush_small_pinky_octopus_limited_edition.jpg', imageUrl2: ''},
        { name: 'Plush Pumpkin Bear', price: 15, size: 'Small', colors: 'Orange', imageUrl1: '../models/plush_pumpkin_bear.jpg', imageUrl2: ''},
        { name: 'Plush Parakeet', price: 15, size: 'Small', colors: 'Green and Yellow', imageUrl1: '../models/plush_parakeet_yellow_green.jpg', imageUrl2: ''},
        { name: 'Plush Parakeet', price: 15, size: 'Small', colors: 'Green and White', imageUrl1: '../models/plush_parakeet.jpg', imageUrl2: ''},
        { name: 'Plush Otter', price: 15, size: 'Small', colors: 'Brown and Light Brown', imageUrl1: '../models/plush_otter.jpg', imageUrl2: ''},
        { name: 'Plush Nugget', price: 12, size: 'Small', colors: 'Off-White', imageUrl1: '../models/plush_nugget.jpg', imageUrl2: ''},
        { name: 'Plush Mushroom Boi', price: 12, size: 'Small', colors: 'White and Red', imageUrl1: '../models/plush_mushroom_boi.jpg', imageUrl2: ''},
        { name: 'Plush Pinky Octopus', price: 25, size: 'Medium', colors: 'Red', imageUrl1: '../models/plush_medium_pinky_octopus.jpg', imageUrl2: ''},
        { name: 'Plush Pinky Octopus', price: 25, size: 'Medium', colors: 'Dark Red', imageUrl1: '../models/plush_medium_pinky_octopus.jpg', imageUrl2: ''},
        { name: 'Plush Pinky Octopus', price: 45, size: 'Large', colors: 'Blue', imageUrl1: '..//models/plush_large_pinky_octopus.jpg', imageUrl2: ''},
        { name: 'Plush Pinky Octopus', price: 45, size: 'Large', colors: 'Hot Pink', imageUrl1: '..//models/plush_large_pinky_octopus.jpg', imageUrl2: ''},
        { name: 'Plush Lazy Daisy', price: 100, size: 'Large', colors: 'Aqua and Light Purple', imageUrl1: '../models/plush_lazy_daisy_aqua_purple.jpg', imageUrl2: ''},
        { name: 'Plush Lazy Daisy', price: 100, size: 'Large', colors: 'Aqua and Pink', imageUrl1: '../models/plush_lazy_daisy_aqua_pink.jpg', imageUrl2: ''},
        { name: 'Plush Bunny', price: 50, size: 'Large', colors: 'White and Blue Pants', imageUrl1: '../models/plush_large_bunny_blue_white.jpg', imageUrl2: ''},
        { name: 'Plush Bunny', price: 50, size: 'Large', colors: 'White and Light Blue Pants', imageUrl1: '../models/plush_large_bunny_blue_grey.jpg', imageUrl2: ''},
        { name: 'Plush Bunny', price: 50, size: 'Large', colors: 'Grey and Light Blue Pants', imageUrl1: '../models/plush_large_bunny_light_blue_white.jpg', imageUrl2: ''},
        { name: 'Plush Bunny', price: 50, size: 'Large', colors: 'White and Pink Pants', imageUrl1: '../models/plush_large_bunny_pink_white.jpg', imageUrl2: ''},
        { name: 'Plush Hamburger Bear', price: 15, size: 'Small', colors: 'Brown, Green and Orange', imageUrl1: '../models/plush_hamburger_bear.jpg', imageUrl2: ''},
        { name: 'Plush Gummy Bear', price: 6, size: 'Small', colors: 'Yellow', imageUrl1: '../models/plush_gummy_bear.jpg', imageUrl2: ''},
        { name: 'Plush Gummy Bear', price: 6, size: 'Small', colors: 'Pink', imageUrl1: '../models/plush_gummy_bear.jpg', imageUrl2: ''},
        { name: 'Plush Gummy Bear', price: 6, size: 'Small', colors: 'Light Blue', imageUrl1: '../models/plush_gummy_bear.jpg', imageUrl2: ''},
        { name: 'Plush Ghost', price: 6, size: 'Small', colors: 'White', imageUrl1: '../models/plush_ghost.jpg', imageUrl2: ''},
        { name: 'Plush Frog', price: 6, size: 'Small', colors: 'Green', imageUrl1: '../models/plush_frog.jpg', imageUrl2: ''},
        { name: 'Plush Witch Hat Frog', price: 6, size: 'Small', colors: 'Green with Light Purple Hat', imageUrl1: '../models/plush_frog_with_witch_hat', imageUrl2: ''},
        { name: 'Plush Ball Frog', price: 6, size: 'Small', colors: 'Green', imageUrl1: '../models/plush_ball_frog.jpg', imageUrl2: ''},
        { name: 'Plush Cow', price: 50, size: 'Large', colors: 'Red and White', imageUrl1: '../models/plush_cow_red_white.jpg', imageUrl2: ''},
        { name: 'Plush Cow', price: 50, size: 'Large', colors: 'Brown and White', imageUrl1: '../models/plush_cow_brown_white.jpg', imageUrl2: ''},
        { name: 'Plush Cow', price: 50, size: 'Large', colors: 'Light Purple and White', imageUrl1: '../models/plush_cow_light_purple_white.jpg', imageUrl2: ''},
        { name: 'Plush Cow', price: 50, size: 'Large', colors: 'Purple and White', imageUrl1: '../models/plush_cow_purple_white.jpg', imageUrl2: ''},
        { name: 'Plush Chonky Bee', price: 7, size: 'Small', colors: 'Yellow and Black', imageUrl1: '../models/plush_chonky_bee.jpg', imageUrl2: '../models/plush_chonky_bee_image2.jpg'},
        { name: 'Plush Axolotl', price: 15, size: 'Medium', colors: 'Aqua', imageUrl1: '../models/plush_axolotl.jpg', imageUrl2: ''},
        { name: 'Plush Axolotl', price: 15, size: 'Medium', colors: 'Pink', imageUrl1: '../models/plush_axolotl.jpg', imageUrl2: ''},
        { name: 'Acrylic Booty Bunny with Bag', price: 7, size: 'Small', colors: 'White with Blue Bag', imageUrl1: '../models/acrylic_booty_bunny_with_bag.jpg', imageUrl2: ''},
        { name: 'Acrylic Booty Bunny with Bag', price: 7, size: 'Small', colors: 'White with Purple Bag', imageUrl1: '../models/acrylic_booty_bunny_with_bag.jpg', imageUrl2: ''},
        { name: 'Acrylic Mushroom Boi', price: 6, size: 'Small', colors: 'Red and White', imageUrl1: '../models/mushroom_boi.jpg', imageUrl2: ''},
        { name: 'Acrylic Nugget with Hat', price: 6, size: 'Small', colors: 'White with Red Hat', imageUrl1: '../acrylic_nugget_with_hat.jpg', imageUrl2: ''},
        { name: 'Acrylic Sunflower Bag Charm', price: 5, size: 'Small', colors: 'Yellow and Brown', imageUrl1: '../models/acrylic_sunflower_bag_charm.jpg', imageUrl2: ''},
        { name: 'Acrylic Lily of the Valley Bag Charm', price: 7, size: 'Small', colors: 'Light Purple', imageUrl1: '../models/acrylic_lily_of_the_valley_bag_charm.jpg', imageUrl2: ''},
        { name: 'Acrylic Lily of the Valley Bag Charm', price: 7, size: 'Small', colors: 'Yellow', imageUrl1: '../models/acrylic_lily_of_the_valley_bag_charm_yellow.jpg', imageUrl2: ''},
        { name: 'Acrylic Lily of the Valley Bag Charm', price: 7, size: 'Small', colors: 'White', imageUrl1: '../models/acrylic_lily_of_the_valley_bag_charm_white.jpg', imageUrl2: ''},
        { name: 'Acrylic Lily of the Valley Bag Charm', price: 7, size: 'Small', colors: 'Pink', imageUrl1: '../models/acrylic_lily_of_the_valley_bag_charm_pink.jpg', imageUrl2: ''},
        { name: 'Acrylic Coasters', price: 2, size: '', colors: 'Green', imageUrl1: '../models/coasters.jpg', imageUrl2: ''},
        { name: 'Keychain Plush Whale', price: 7, size: 'Small', colors: 'Light Blue and White', imageUrl1: '../models/plush_keychain_whale.jpg', imageUrl2: ''}
      ]
      const stuffies = await Promise.all(stuffiesToAddToDatabase.map(addStuffyToDatabase));
  
      console.log(stuffies);
      console.log('Finished adding stuffies into database!');
    } catch (error) {
      console.error('Error adding stuffies to database!');
      throw error;
    }
  
  }
  
  async function addStuffyToDatabase({name,price,size,colors,imageUrl1,imageUrl2}){
    
    try{
      const {rows: [stuffie]} = await client.query(`
        INSERT INTO stuffies(name,price,size,colors,imageUrl1,imageUrl2) VALUES ($1,$2,$3,$4,$5,$6)
        
        RETURNING id, name
      `, [name,price,size,colors,imageUrl1,imageUrl2]);
      return stuffie;
    }catch (error) {
      throw error;
    }
  }
  
  async function getAllStuffies() {
    /* this adapter should fetch a list of users from your db */
    console.log('getting all stuffies')
      try {
        const {rows} = await client.query(`
          SELECT * FROM stuffies;
        `);
        return rows;
      } catch (error) {
        throw error;
      }
  }
  

async function getStuffyById(stuffyId){
    try {
      const {rows: [stuffy]} = await client.query(`
        SELECT *
        FROM stuffies
        WHERE id = $1;
      `,[stuffyId]);
  
      if(!stuffy) return null;
      
      return stuffy;
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = {
    // add your database adapter fns here
    createStuffiesDatabase,
    addStuffyToDatabase,
    getAllStuffies,
    getStuffyById
  }