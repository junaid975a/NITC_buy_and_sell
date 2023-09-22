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
            await sequelize.query("insert into categories (name,createdAt,updatedAt) values (:categoryName,NOW(),NOW())", {
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
        const insertQuery = "INSERT INTO products (name, description,image_url,pdt_condition, createdAt,updatedAt,item_price,categoryId,sellerId) VALUES (:name, :description, :image_url, :pdt_condition, NOW(),NOW(), :price, :categoryId, :sellerId)"

        const productData = {
            name: name,
            description: description,
            image_url: image_url,
            pdt_condition: condition,
            categoryId: categoryId,
            sellerId: req.user,
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
                price: price,
                status: "not sold"
            });
        } else {
            res.status(500).send({ message: 'Failed to create product' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const { name, description, image_url, condition, categoryName, price, newStatus } = req.body;
    // let status = req.body
    const id = req.params.id;
    if (!name || !description || !condition || !categoryName || !price) {
        res.status(400).send({ message: 'Invalid inputs' });
        return;
    }
    const validStatusValues = ["sold", "not sold"];
    // const status = validStatusValues.includes(newStatus) ? newStatus : "not sold";
    const status = newStatus ? newStatus : "not sold";
    // console.log(req.user);
    try {

        // const user = req.user;
        // 1. check if the user is actually the seller of the product
        const userId = await sequelize.query("select sellerId from products where sellerId=:sellerId and id=:id",{
            replacements:{
                sellerId:req.user,
                id:id
            },
            type: QueryTypes.SELECT
        });

        // console.log("seller :",userId);
        if(userId.length===0){
            res.status(400).json({message:"You are not the owner of this product"})
            return;
        }

        // 2. Check if the product has already been in solditems i.e it is already sold out
        const isSold = await sequelize.query("select * from solditems where productId = :id",{
            replacements:{id},
            type:QueryTypes.SELECT
        })

        if(isSold.length > 0){
            res.status(400).json({message:"This product has already been sold out , so you cannot update this"})
            return;
        }
        // 3. if both cases doesn't satisfy then proceed'
        const lCategoryName = categoryName.toLowerCase();

        let categoryId = await sequelize.query("select id from categories where name = :lCategoryName", {
            replacements: { lCategoryName },
            type: QueryTypes.SELECT
        })
        console.log(categoryId);
        if (categoryId.length === 0) {
            await sequelize.query("insert into categories (name,createdAt,updatedAt) values (:lCategoryName,NOW(),NOW())", {
                replacements: { lCategoryName },
                type: QueryTypes.INSERT
            })

            categoryId = await sequelize.query("select id from categories where name = :lCategoryName", {
                replacements: { lCategoryName },
                type: QueryTypes.SELECT
            })
        }
        categoryId = categoryId[0].id
        console.log(categoryId, id);
        
        const productData = {
            name: name,
            description: description,
            image_url: image_url,
            pdt_condition: condition,
            categoryId: categoryId,
            price: price,
            id: id,
            status: status,
        };

        const updateQuery = "UPDATE products SET name=:name, description=:description, image_url=:image_url, pdt_condition=:pdt_condition, item_price=:price, categoryId=:categoryId, updatedAt=NOW(), status=:status WHERE id = :id";
        
        const product = await sequelize.query(updateQuery, {
            replacements: productData,
            type: QueryTypes.UPDATE
        });


        if (product) {

            if(status==="sold"){
                const {finalPrice,buyerId} = req.body
                if(finalPrice && buyerId) {

                    const buyer = await sequelize.query("select * from users where email=:buyerId",{
                        replacements:{buyerId},
                        type:QueryTypes.SELECT
                    })
                    if(buyer.length===0) {
                        res.status(404).json({
                            "message": "User not found"
                        })
                        return;
                    }
                    console.log(buyer);
                    const insertQuery = "INSERT INTO solditems (finalPrice,buyerId,productId,createdAt,updatedAt) values (:finalPrice,:buyerId,:id,NOW(),NOW())";
                    const soldData = {
                        finalPrice: finalPrice,
                        id:id,
                        buyerId: buyer[0].email
                    }
                    const soldProduct = await sequelize.query(insertQuery,{
                        replacements:soldData,
                        type: QueryTypes.INSERT
                    })
                    if(soldProduct){
                        const buyerData = await sequelize.query("select * from users where email= :buyerId",{
                            replacements:{buyerId},
                            type: QueryTypes.SELECT
                        })
                        res.status(201).json({
                            name: name,
                            description: description,
                            image_url: image_url,
                            pdt_condition: condition,
                            categoryName: categoryName,
                            price: price,
                            status: status,
                            finalPrice:finalPrice,
                            buyer:buyerData[0]
                        })
                        return;
                    }
                }

            }

            res.status(201).json({
                name: name,
                description: description,
                image_url: image_url,
                pdt_condition: condition,
                categoryName: categoryName,
                price: price,
                status: status
            });
        } else {
            res.status(500).send({ message: 'Failed to update product' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    
    try {
        const userId = await sequelize.query("select sellerId from products where sellerId=:sellerId",{
            replacements:{sellerId:req.user},
            type: QueryTypes.SELECT
        });

        console.log(userId);
        if(userId.length===0){
            res.status(500).json({message:"Unauthorized access"})
            return;
        }
        const product = await sequelize.query("select * from products where id=:id",{
            replacements:{id},
            type:QueryTypes.SELECT
        })
        if(product.length === 0) {
            res.status(404).json({ message: 'product not found' });
        }
        await sequelize.query("delete from products where id = :id",{
            replacements:{id},
            type:QueryTypes.DELETE
        })
        res.status(200).json({message:"deleted successfully"})
    }catch(error){
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

// const moveToSoldProducts = () => {

// }

const getAllProducts = async(req, res) => {
    try {
        const allProducts = await sequelize.query("select * from products where status='not sold'",{
            type:QueryTypes.SELECT
        })
        console.log(allProducts);
        res.status(200).json(allProducts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
    
}


const getCategories = async(req, res) => {
    try {
        const allCategories = await sequelize.query("select * from categories",{
            type:QueryTypes.SELECT
        })
        console.log(allCategories);
        res.status(200).json(allCategories)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

const getSearchProducts = async (req, res) => {
    console.log(req.params);
    const { query } = req.params;
    console.log(query);
    const searchQuery = query.trim().toLowerCase();
    
    try {
        const searchedProducts = await sequelize.query("SELECT * FROM products WHERE LOWER(name) LIKE :searchQuery", {
            replacements: { searchQuery: `%${searchQuery}%` },
            type: QueryTypes.SELECT
        });
        
        console.log(searchedProducts);
        res.status(200).json(searchedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getCategories,
    getSearchProducts
}