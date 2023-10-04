module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sellerId: {
            type: DataTypes.STRING,
            references: {
                model: 'users',
                key: 'email',
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pdt_condition: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        item_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("sold", "not sold"),
            defaultValue: "not sold"
        },
    });

    return Product;
};
