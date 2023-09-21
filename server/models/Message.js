module.exports = (sequelize,DataTypes) => {
    const Message = sequelize.define('message', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        message_text:{
            type:DataTypes.TEXT,
            allowNull: false
        }
    })
    return Message
}