module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        avg_rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        tot_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    })
    return User
}