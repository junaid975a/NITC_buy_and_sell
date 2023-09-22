module.exports = (sequelize,DataTypes) => {
    const Chat = sequelize.define('chat',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        latestMessage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model:"messages",
                key: "id"
            },
            onDelete: 'SET NULL',
        }
    });
    return Chat
}