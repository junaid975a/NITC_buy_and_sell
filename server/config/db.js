const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "J@123_mysql",
    database: "nitc_buy_and_sell"
});

module.exports = db;