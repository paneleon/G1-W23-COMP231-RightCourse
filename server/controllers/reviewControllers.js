const asyncHandler = require('express-async-handler')
const Review = require('../models/review')

//@ desc    Get one course review by review id
//@ route   GET /api/review/:id
//@ access  PUBLIC   
const getReviewByReviewId = asyncHandler(async (req, res) => {

    try{
        let review = await Review.findById(req.params.id);

        if(review==null) {
            return res.status(404).json({message: `Review with id ${req.params.id} does not exist`});
        }
        res.json(review);
    }
    catch(error){
        return res.status(500).json(error);
    }
    
})

module.exports = {
    getReviewByReviewId,
}