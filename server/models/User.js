module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        rollno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
}