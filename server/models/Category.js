module.exports = (sequelize,DataTypes) => {
    const Category = sequelize.define('category',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
    })
    return Category
}