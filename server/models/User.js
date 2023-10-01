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
        profilePicture:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        tot_no_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        tot_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
    return User
}