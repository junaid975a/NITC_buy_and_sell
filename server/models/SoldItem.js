module.exports = (sequelize, DataTypes) => {
  const SoldItem = sequelize.define('solditem', {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Set productId as the primary key
      references: {
        model: 'products', // Reference the 'products' table
        key: 'id', // Reference the 'id' column in 'products'
      },
      allowNull: false,
    },
    finalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    buyerId: {
      type: DataTypes.STRING,
      references: {
        model: 'users', // Reference the 'products' table
        key: 'email', // Reference the 'id' column in 'products'
      }
    },
    isReviewed: { // New attribute
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return SoldItem;
};
