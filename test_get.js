const sqlite = require('sqlite3');

const Activite = require("./app/model/Activite");

(async () => {
    let db = new sqlite.Database('./sqlite.db');

    let result = await Activite.get(db, {idEquip:["71148","71393"]});

    console.log(result);
})();