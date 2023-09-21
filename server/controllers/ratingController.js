const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const createRating = async (req, res) => {
    const { rating, review } = req.body;

    if (!rating && !review) {
        res.send(404).json({ message: "give atleast one rating or review" });
        return;
    }
    try {
        const productId = req.params.id;
        const buyerId = req.user;


        // check if the requested user is the buyer of the product
        const isBuyer = await sequelize.query("select sellerId from solditems where buyerId=:buyerId", {
            replacements: {buyerId},
            type: QueryTypes.SELECT
        });

        if (isBuyer.length === 0) {
            res.status(400).json({ message: "You are not the buyer of this product" })
            return;
        }

        // verify that the product has already sold or not
        const product = await sequelize.query("select * from solditems where productId = :productId", {
            replacements: { productId },
            type: QueryTypes.SELECT
        })
        // if not then, it is unauthorized access
        if (product.length === 0) {
            res.send(404).json({ message: "product not found" });
        }
        let fRating = 0;
        if (rating) {
            fRating = rating
        }
        let fReview = "";
        if (review) {
            fReview = review
        }

        const insertQuery = "INSERT INTO ratings (productId,rating,review) VALUES (:productId,:rating,:review)";

        const data = {
            productId: productId,
            rating: fRating,
            review: fReview
        }

        const finalRating = await sequelize.query(insertQuery, {
            replacements: data,
            type: QueryTypes.INSERT
        })

        if (finalRating) {
            // find the user of the product and update their avg_rating
            const sellerId = await sequelize.query("select sellerId from products where id=:productId",{
                replacements:{productId},
                type:QueryTypes.SELECT
            })
            // find the rating details of the seller
            const ratingsData = await sequelize.query("select avg_rating,tot_rating from users where email=:sellerId",{
                replacements:{sellerId},
                type:QueryTypes.SELECT
            })

            const no_of_ratings = ratingsData[0].tot_no_rating+1;
            const total_ratings = ratingsData[0].tot_rating+fRating
            // update the rating details of the seller
            const updateQuery = "UPDATE users SET tot_no_rating=no_of_ratings,tot_rating=total_ratings,updatedAt=NOW() WHERE email = :sellerId"
            const updatedUser = await sequelize.query(updateQuery, {
                replacements:{
                    no_of_ratings:no_of_ratings,
                    total_ratings:total_ratings,
                    sellerId:sellerId
                },
                type:QueryTypes.UPDATE
            })
            res.status(200).json(finalRating)
        } else {
            res.status(500).json({ message: "Failed to create review" })
            return
        }
    } catch (error) {
        res.status(500).json(error.message)
        return;
    }
}

const updateRating = (req, res) => {

}

const deleteRating = (req, res) => {

}

const getRating = (req, res) => {

}

module.exports = {
    createRating,
    updateRating,
    deleteRating,
    getRating
}