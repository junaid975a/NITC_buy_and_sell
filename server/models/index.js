// eslint-disable-next-line
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    logging:false,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging:false,
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// model relations
db.category.hasMany(db.product)
db.product.belongsTo(db.category)

// db.user.hasMany(db.product)
// db.product.belongsTo(db.user)

// db.product.hasOne(db.solditem);

// db.solditem.belongsTo(db.product, {
//   foreignKey: 'productId', // Use productId as the foreign key
// });

// db.user.hasMany(db.solditem);

// Define the association on the db.solditem model
// db.solditem.belongsTo(db.user, {
//   foreignKey: 'buyerId',
//   as: 'buyer',
// });

// db.solditem.hasOne(db.rating)
// db.rating.belongsTo(db.solditem,{
//   foreignKey: 'productId',
//   as:'product'
// })

db.chat.belongsTo(db.user, {
  foreignKey: 'sellerId',
  as: 'seller',
});

db.chat.belongsTo(db.user, {
  foreignKey: 'buyerId',
  as: 'buyer',
});

db.message.belongsTo(db.user, {
  foreignKey: 'senderId',
  as: 'sender'
})
db.message.belongsTo(db.chat,{
  foreignKey: 'chatId',
  as: 'chat'
})

// db.chat.belongsTo(db.message,{
//   foreignKey: 'latestMessageId',
//   allowNull: true,
//   onDelete: 'SET NULL',
// })


module.exports = db;
