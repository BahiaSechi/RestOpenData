const sqlite = require('sqlite3');
const parse = require('csv-parse');
const fs = require('fs');

let db = new sqlite.Database('./sqlite.db');


if (process.argv[2] && process.argv[3]) {
    // Create tables
    fs.createReadStream(process.argv[2])
        .pipe(parse({delimiter: ";", columns: true}))
        .on("data", data => {
            console.log(data);
        });
}