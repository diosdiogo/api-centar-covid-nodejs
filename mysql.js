const mysql = require('mysql');

// var pool = mysql.createPool({
//     "user" : process.env.MYSQL_USER,
//     "password" : process.env.MYSQL_PASSWORD,
//     "database" : process.env.MYSQL_DATABASE,
//     "host" : process.env.MYSQL_HOST,
//     "port" : process.env.MYSQL_PORT
// });

var pool = mysql.createPool({
    "user" : 'b5550267eecea7',
    "password" : '082d7df5',
    "database" : 'heroku_97a2ddb9afe9528',
    "host" : 'us-cdbr-east-03.cleardb.com',
    "port" : 3306
});

exports.pool = pool;