const sqlite = require('sqlite3');
const parse = require('csv-parse');
const fs = require('fs');

const Activite = require("../model/Activite");
const Equipement = require("../model/Equipement");
const Installation = require("../model/Installation");

fs.unlinkSync('./sqlite.db');
let db = new sqlite.Database('./sqlite.db');

let i = 0;

function loadCsv(path, destClass) {
    destClass.createTable(db);

    fs.createReadStream(path)
        .pipe(parse({delimiter: ";", columns: true}))
        .on("data", data => {
            //console.log(data);
            destClass.fromCsv(data).insert(db);
            console.log(i++);
        }).on("error", error=> {
            console.log(error);
        }

    );
}

// Create tables
db.serialize(() => {
    loadCsv("csv/activites_small.csv", Activite);
    loadCsv("csv/equipements_small.csv", Equipement);
    loadCsv("csv/installations_small.csv", Installation);
});