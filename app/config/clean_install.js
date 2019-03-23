const sqlite = require('sqlite3');

let db = new sqlite.Database('./sqlite.db');

db.run("DELETE FROM Installation WHERE id=''");