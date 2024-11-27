const express = require('express');

const mysql = require('mysql2');

const app = express(); 

const PORT = 3000; 
const dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_database"
});

dbCon.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connection is DONE!");
});

app.get('/db', (req, res) => {
    console.log("Access DB Route page");
    let sql = 'CREATE DATABASE if not exists my_database';
    dbCon.query(sql, (error, result) => {
        if (error) {
            console.log(error.message);
            throw error;
        }
        console.log(result);
        res.send('A new database was created!');
    });
});

app.get('/users', (req, res) => {
    const sql = 'CREATE TABLE users(user_id INT AUTO_INCREMENT, first_name VARCHAR(40), last_name VARCHAR(40), email VARCHAR(50), PRIMARY KEY(user_id))';
    dbCon.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('users table is created!');
    });
});

app.get('/adduser', (req, res) => {
    let firstName = 'Alex';
    let lastName = 'Chow';
    let email = 'alexchow@yahoo.ca';
    const sql = `INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);`;

    dbCon.query(sql, [firstName, lastName, email], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('One user was inserted');
    });
});

app.get('/selectall', (req, res) => {
    const sql = `SELECT * FROM users`; 
    dbCon.query(sql, (err, records) => {
        if (err) {
            throw err;
        }
        console.log(records);
        res.send('All users');
    });
});

app.get('/select/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, record) => {
        if (err) {
            throw err;
        }
        console.log(record);
        res.send('One user');
    });
});

app.get('/update/:id', (req, res) => {
    let last_name = "Johnson"
    const sql = `UPDATE users SET last_name = '${last_name}' WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, record) => {
        if (err) {
            throw err;
        }
        console.log(record);
        res.send('One record was updated');
    });
});

app.get('/delete/:id', (req, res) => {
    const sql = `DELETE FROM users WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('One record was deleted');
    });
});

app.listen(PORT, () => {
    console.log(`Express App Server listening on port ${PORT} and the local server URL: http://localhost:3000/`);
});