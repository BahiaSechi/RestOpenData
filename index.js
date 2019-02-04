const sqlite = require('sqlite3');
const express = require('express');

let db = new sqlite.Database('./sqlite.db');

// Create tables
let queries = [
    "CREATE TABLE if not exists test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
];
queries.forEach(query => db.serialize(() => db.run(query)));
