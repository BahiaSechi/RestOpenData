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
    db.serialize(() => {
        destClass.createTable(db);

        fs.createReadStream(path)
            .pipe(parse({delimiter: ";", columns: true}))
            .on("data", data => {
                console.log(data);
                destClass.fromCsv(data).insert(db);
                console.log(i++);
            }).on("error", error=> {
                console.log(error);
            }

        );
    });
};

// Create tables
loadCsv("csv/activites.csv", Activite);
loadCsv("csv/equipements.csv", Equipement);
loadCsv("csv/installations.csv", Installation);