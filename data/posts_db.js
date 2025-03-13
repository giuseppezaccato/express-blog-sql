//task import mysql
const mysql = require('mysql2');

//task funzione di collegamento nodeJS-MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'posts'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

//task export oggetto "connessione" 
//? Questo permette ad altri moduli di importare e utilizzare la connessione.
module.exports = connection;
