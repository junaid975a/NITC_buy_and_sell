const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");


const checkAuthBuyer = async (buyerId) => {
    const isBuyer = await sequelize.query("select * from solditems where buyerId=:buyerId", {
        replacements: { buyerId },
        type: QueryTypes.SELECT
    });
    return isBuyer
}

const checkSoldItems = async (productId) => {
    const product = await sequelize.query("select * from solditems where productId = :productId", {
        replacements: { productId },
        type: QueryTypes.SELECT
    })
    return product
}


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
        const isBuyer = checkAuthBuyer(buyerId);
        if (isBuyer.length === 0) {
            res.status(400).json({ message: "You are not the buyer of this product" })
            return;
        }

        // verify that the product has already sold or not
        const product = checkSoldItems(productId)
        if (product.length === 0) {
            res.send(404).json({ message: "product not found" });
        }
        // check if any rating is already provided
        const isAlreadyRated = await sequelize.query("select * from ratings where productId = :productId", {
            replacements: { productId },
            type: QueryTypes.SELECT
        })

        if (isAlreadyRated.length > 0) {
            res.status(400).json({ message: "You have already rated this product" })
            return;
        }

        let fRating = 0;
        if (rating) {
            fRating = rating
        }
        let fReview = "";
        if (review) {
            fReview = review
        }

        const insertQuery = "INSERT INTO ratings (productId,rating,review,createdAt,updatedAt) VALUES (:productId,:rating,:review,NOW(),NOW())";

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
            await sequelize.query("update solditems set isReviewed=true where productId=:productId",{
                replacements:{
                    productId
                },
                type: QueryTypes.UPDATE
            })
            // find the user of the product and update their avg_rating
            const sellerId = await sequelize.query("select sellerId from products where id=:productId", {
                replacements: { productId },
                type: QueryTypes.SELECT
            })
            // console.log(sellerId[0]);
            // find the rating details of the seller
            const ratingsData = await sequelize.query("select tot_no_rating,tot_rating from users where email=:sellerId", {
                replacements: {
                    sellerId: sellerId[0].sellerId
                },
                type: QueryTypes.SELECT
            })
            // console.log(ratingsData);
            const no_of_ratings = ratingsData[0].tot_no_rating + 1;
            const total_ratings = ratingsData[0].tot_rating + fRating
            // update the rating details of the seller
            const updateQuery = "UPDATE users SET tot_no_rating=:no_of_ratings,tot_rating=:total_ratings,updatedAt=NOW() WHERE email = :sellerId"
            // eslint-disable-next-line no-unused-vars
            const updatedUser = await sequelize.query(updateQuery, {
                replacements: {
                    no_of_ratings: no_of_ratings,
                    total_ratings: total_ratings,
                    sellerId: sellerId[0].sellerId
                },
                type: QueryTypes.UPDATE
            })
            res.status(200).json({
                rating: fRating,
                review: fReview,
                buyerId: buyerId,
                sellerId: sellerId[0].sellerId,
                productId: productId
            })
        } else {
            res.status(500).json({ message: "Failed to create review" })
            return
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        return;
    }
}

const updateRating = async (req, res) => {
    const { rating, review } = req.body;
    if (!rating && !review) {
        res.send(404).json({ message: "give atleast one rating or review" });
        return;
    }
    try {
        const productId = req.params.id;
        const buyerId = req.user;


        // check if the rating exist or not  
        const existedRating = await sequelize.query("select * from ratings where productId = :productId", {
            replacements: { productId },
            type: QueryTypes.SELECT
        })
        // // console.log(ra);
        if (existedRating.length === 0) {
            res.status(404).json({ message: "Rating not found" });
            return;
        }
        const prevRating = existedRating[0].rating;
        // check if the requested user is the buyer of the product
        const isBuyer = checkAuthBuyer(buyerId);
        if (isBuyer.length === 0) {
            res.status(400).json({ message: "You are not the buyer of this product" })
            return;
        }


        let fRating = 0;
        if (rating) {
            fRating = rating
        }
        let fReview = "";
        if (review) {
            fReview = review
        }

        const updateQuery = "UPDATE ratings SET rating=:rating,review=:review where productId=:productId";

        const data = {
            productId: productId,
            rating: fRating,
            review: fReview
        }

        const finalRating = await sequelize.query(updateQuery, {
            replacements: data,
            type: QueryTypes.UPDATE
        })

        if (finalRating) {
            // find the user of the product and update their avg_rating
            const sellerId = await sequelize.query("select sellerId from products where id=:productId", {
                replacements: { productId },
                type: QueryTypes.SELECT
            })
            // console.log(sellerId[0]);
            // find the rating details of the seller
            const ratingsData = await sequelize.query("select tot_no_rating,tot_rating from users where email=:sellerId", {
                replacements: {
                    sellerId: sellerId[0].sellerId
                },
                type: QueryTypes.SELECT
            })
            // console.log(ratingsData);
            const total_ratings = (ratingsData[0].tot_rating - prevRating) + fRating
            // update the rating details of the seller
            const updateQuery = "UPDATE users SET tot_rating=:total_ratings,updatedAt=NOW() WHERE email = :sellerId"
            // eslint-disable-next-line no-unused-vars
            const updatedUser = await sequelize.query(updateQuery, {
                replacements: {
                    total_ratings: total_ratings,
                    sellerId: sellerId[0].sellerId
                },
                type: QueryTypes.UPDATE
            })
            res.status(200).json({
                rating: fRating,
                review: fReview,
                buyerId: buyerId,
                sellerId: sellerId[0].sellerId,
                productId: productId
            })
        } else {
            res.status(500).json({ message: "Failed to update review" })
            return
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message })
        return;
    }
}

const deleteRating = async (req, res) => {
    const productId = req.params.id;
    const buyerId = req.user;
    try {
        // check if the rating exist or not  
        const rating = await sequelize.query("select * from ratings where productId = :productId", {
            replacements: { productId },
            type: QueryTypes.SELECT
        })

        if (rating.length === 0) {
            res.status(404).json({ message: "Rating not found" });
            return;
        }

        // check if the requested user is the buyer of the product
        const isBuyer = checkAuthBuyer(buyerId);
        if (isBuyer.length === 0) {
            res.status(400).json({ message: "You are not the buyer of this product" })
            return;
        }

        const prevRating = rating[0].rating;

        await sequelize.query("delete from ratings where productId = :productId", {
            replacements: { productId },
            type: QueryTypes.DELETE
        })

        // find the user of the product and update their avg_rating
        const sellerId = await sequelize.query("select sellerId from products where id=:productId", {
            replacements: { productId },
            type: QueryTypes.SELECT
        })
        // console.log(sellerId[0]);
        // find the rating details of the seller
        const ratingsData = await sequelize.query("select tot_no_rating,tot_rating from users where email=:sellerId", {
            replacements: {
                sellerId: sellerId[0].sellerId
            },
            type: QueryTypes.SELECT
        })
        // console.log(ratingsData);
        const no_of_ratings = ratingsData[0].tot_no_rating + 1;
        const total_ratings = (ratingsData[0].tot_rating - prevRating)
        // update the rating details of the seller
        const updateQuery = "UPDATE users SET tot_no_rating=:no_of_ratings,tot_rating=:total_ratings,updatedAt=NOW() WHERE email = :sellerId"
        // eslint-disable-next-line no-unused-vars
        const updatedUser = await sequelize.query(updateQuery, {
            replacements: {
                no_of_ratings: no_of_ratings-1,
                total_ratings: total_ratings-prevRating,
                sellerId: sellerId[0].sellerId
            },
            type: QueryTypes.UPDATE
        })
        res.status(200).json({
            message: "Deleted successfully",
            buyerId: buyerId,
            sellerId: sellerId[0].sellerId,
            productId: productId
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        return;
    }
}

const getRating = async (req, res) => {
    const productId = req.params.id;
    const rating = await sequelize.query("select * from ratings where productId = :productId", {
        replacements: { productId },
        type: QueryTypes.SELECT
    })

    if (rating.length === 0) {
        res.status(404).json({ message: "Rating not found" });
        return;
    }
    res.status(200).json(rating[0])
}

module.exports = {
    createRating,
    updateRating,
    deleteRating,
    getRating
}