module.exports = (sequelize,DataTypes) => {
    const SoldItem = sequelize.define('solditem',{
        finalPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    });
    return SoldItem
}