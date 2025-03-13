//task import mysql
const mysql = require('mysql2');

//task funzione di collegamento nodeJS-MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'posts_db'
});

//fix throw err != return err => differenze principali!
//? Interruzione del Flusso: throw err interrompe il flusso di esecuzione, mentre return err no.
//? Gestione dell'Errore: throw err richiede un blocco try...catch per la gestione, mentre return err consente al codice chiamante di gestire l'errore.
//? Contesto: throw err è più generale, mentre return res.status(...) è specifico per le risposte HTTP.

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

//task export oggetto "connessione" 
//? Questo permette ad altri moduli di importare e utilizzare la connessione.
module.exports = connection;
