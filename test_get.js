const sqlite = require('sqlite3');

const Activite = require("./app/model/Activite");

let db = new sqlite.Database('./sqlite.db');

Activite.get(db, {idEquip:["71148","71393"]});