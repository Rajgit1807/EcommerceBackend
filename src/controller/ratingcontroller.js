const RatingService = require("../services/ratingservice");

const createRating = async(req,res)=>{

const user = req.user;

try {
    const rating = await RatingService.createRating(req.body,user);
    return res.status(201).send(rating);
} catch (error) {
    return res.status(500).send({error:error.message});
}


}

const getProductRating = async(req,res)=>{

    const productId = req.params.productId;
    
    try {
        const rating = await RatingService.getProductRating(productId);
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
    
    
}

    module.exports ={
        createRating,
        getProductRating
    }