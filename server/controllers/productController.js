const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");


const createProduct = async (req, res) => {
    const { name, description, image_url, condition, categoryName, price } = req.body;
    if (!name || !description || !image_url || !condition || !categoryName || !price) {
        res.status(400).send({ message: 'Invalid inputs' });
        return;
    }
    try {

        let categoryId = await sequelize.query("select id from categories where name = :categoryName", {
            replacements: { categoryName },
            type: QueryTypes.SELECT
        })
        console.log(categoryId);
        if (categoryId.length === 0) {
            const newCategory = await sequelize.query("insert into categories (name,createdAt,updatedAt) values (:categoryName,NOW(),NOW())", {
                replacements: { categoryName },
                type: QueryTypes.INSERT
            })

            categoryId = await sequelize.query("select id from categories where name = :categoryName", {
                replacements: { categoryName },
                type: QueryTypes.SELECT
            })
        }
        categoryId = categoryId[0].id
        console.log(categoryId);
        const insertQuery = "INSERT INTO products (name, description,image_url,pdt_condition, createdAt,updatedAt,item_price,categoryId,userEmail) VALUES (:name, :description, :image_url, :pdt_condition, NOW(),NOW(), :price, :categoryId, :userEmail)"

        const productData = {
            name: name,
            description: description,
            image_url: image_url,
            pdt_condition: condition,
            categoryId: categoryId,
            userEmail: req.user,
            price: price
        }

        const product = await sequelize.query(insertQuery, {
            replacements: productData,
            type: QueryTypes.INSERT
        })

        if (product) {
            res.status(201).json({
                name: name,
                description: description,
                image_url: image_url,
                pdt_condition: condition,
                categoryName: categoryName,
                price: price
            });
        } else {
            res.status(500).send({ message: 'Failed to create product' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

const updateProduct = (req, res) => {

}

const deleteProduct = (req, res) => {

}

const getAllProducts = (req, res) => {

}

// const 

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
}