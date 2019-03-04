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
        let args = "CREATE TABLE "+this.name + "(";
        for (let i of constrArgs(this)){
            args+=i+" text,";
        }
        args = args.substr(0, args.length-1);
        args+=");";
        db.run(args);
    }

    insert(db) {
        console.log("first");
        let vals = Object.values(this);

        let command = 'INSERT INTO ' + this.constructor.name + " VALUES ";

        command += "(" + new Array(vals.length).fill("?").join(", ") + ");";


        console.log("com")
        db.run(command, vals, function(err) {
            if (err) {
                console.log(err.message);
            }
            // get the last insert id
            //console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

        console.log("ok")

    }
}

module.exports = DBObject;