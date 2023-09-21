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
    if (!name || !description || !image_url || !condition || !categoryName || !price) {
        res.status(400).send({ message: 'Invalid inputs' });
        return;
    }
    const validStatusValues = ["sold", "not sold"];
    // const status = validStatusValues.includes(newStatus) ? newStatus : "not sold";
    const status = newStatus ? newStatus : "not sold";

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

const moveToSoldProducts = () => {

}

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

// const 

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
}