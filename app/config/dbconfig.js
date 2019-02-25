const sqlite = require('sqlite3');
const parse = require('csv-parse');
const fs = require('fs');

const Activite = require("../model/Activite");
const Equipement = require("../model/Equipement");
const Installation = require("../model/Installation");

let db = new sqlite.Database('./sqlite.db');

function loadCsv(path, destClass) {
    destClass.createTable(db);

    fs.createReadStream(path)
        .pipe(parse({delimiter: ";", columns: true}))
        .on("data", data => {
            destClass.fromCsv(data).insert(db);
        });
}

// Create tables
loadCsv("csv/activites.csv", Activite);
loadCsv("csv/equipements.csv", Equipement);
loadCsv("csv/installations.csv", Installa);