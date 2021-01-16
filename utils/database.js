const mysql = require("mysql2");
require('dotenv').config();
require('dotenv').config();
const pool = mysql.createPool({
    host:process.env.HOST_NAME,
    user:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DBNAME
});
module.exports = pool.promise();