//task import mysql
const mysql = require('mysql2');

//task funzione di collegamento nodeJS-MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'posts_db'
});

//FIX {throw err != return err} riguarda poi tutto e cerca la spiegazione!

connection.connect((err) => {
    if (err) return err;
    console.log('Connected to MySQL database!');
});

//task export oggetto "connessione" 
//? Questo permette ad altri moduli di importare e utilizzare la connessione.
module.exports = connection;
