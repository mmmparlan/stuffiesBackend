const client = require('../client')




async function createInitReview(){

    try {

        const initReviewData = [
            { stuffyid: 2, username: 'mark',  stuffyreview:'so soft and cuddly!' }
          ]
          const initReview = await Promise.all(initReviewData.map(addReview));
      
          console.log('init review data created:');
          console.log(initReview);
          console.log('Finished creating init review data!');
        
    } catch (error) {
        console.error('Error creating init review data!');
        throw error;
    }
}

async function addReview({stuffyid,username,stuffyreview}){
    
    try{
      const {rows: [itemReview]} = await client.query(`
        INSERT INTO reviews(stuffyid,username,stuffyreview) VALUES ($1,$2,$3)
        
        RETURNING id, stuffyid, username,  stuffyreview
      `, [stuffyid,username,stuffyreview]);
      return itemReview;
    }catch (error) {
      throw error;
    }
  }

  async function deleteReview(id){

    try {

        const { rows: [review] } = await client.query(`
        DELETE FROM reviews
        WHERE id=$1
        RETURNING *;
        `, [id]);

        return review;
    } catch (error) {
        throw error;
    }
  }

  async function editReviewId(reviewId,{stuffyid,username,stuffyreview}){

    try {

        const {rows: [review]} = await client.query(`
        UPDATE reviews
        SET stuffyid = $2, username = $3, stuffyreview = $4
        WHERE id = $1

        `,[reviewId,stuffyid,username,stuffyreview])

        return review;
        
    } catch (error) {
        throw error;
    }
  }

  async function getAllReviews() {
    /* this adapter should fetch a list of reviews from your db */
    console.log('getting all getting all reviews')
      try {
        const {rows} = await client.query(`
        SELECT * FROM reviews
        `);
        return rows;
      } catch (error) {
        throw error;
      }
  }



module.exports = {
    createInitReview,
    addReview,
    deleteReview,
    editReviewId,
    getAllReviews
}