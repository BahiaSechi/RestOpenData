const {constrArgs} = require("../util");

class DBObject {
    static csvNames() {
        return [];
    }

    static fromCsv(obj) {
        let params = [];
        for (let i of this.csvNames()) {
            params.push(obj[i]);
        }
        return new this(...params);
    }

    static createTable(db) {
        let args = "CREATE TABLE "+this.constructor.name + "(";
        for (let i of constrArgs(this)){
            args+=i+" text,";
        }
        args = args.substr(0, args.length-2);
        args+=");";
        db.run(args);
    }

    insert(db) {

        Object.values(this)

        /*db.run(`INSERT INTO langs(name) VALUES(?)`, Object.values(this), function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });*/
    }
}

module.exports = DBObject;