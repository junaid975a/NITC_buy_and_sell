module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Set productId as the primary key
            references: {
                model: 'solditems', // Reference the 'products' table
                key: 'productId', // Reference the 'id' column in 'products'
            },
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
    return Rating
}