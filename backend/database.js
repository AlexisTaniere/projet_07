const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');


    connection.query('SELECT * FROM utilisateur', (err, res) => {
        return console.log(res);
    })

});

module.exports = connection;