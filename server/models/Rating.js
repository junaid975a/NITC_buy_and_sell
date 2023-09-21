module.exports = (sequelize,DataTypes) => {
    const Rating = sequelize.define('rating',{
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