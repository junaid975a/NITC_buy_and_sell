module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('product',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        image_url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        pdt_condition:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        item_price:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        avg_rating:{
            type:DataTypes.FLOAT,
            allowNull:true,
            defaultValue:0
        },
        tot_rating:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        status:{
            type:DataTypes.ENUM("sold","not sold"),
            defaultValue:"not sold"
        }
    })
    return Product
}