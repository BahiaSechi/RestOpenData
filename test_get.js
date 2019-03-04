const sqlite = require('sqlite3');

const Activite = require("./app/model/Activite");

let db = new sqlite.Database('./sqlite.db');

console.log(Activite.get(db));