module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('product',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phoneNo:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        avg_rating:{
            type:DataTypes.FLOAT,
            allowNull:true
        },
        tot_rating:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    })
    return Product
}