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
        //console.log("first");
        let vals = Object.values(this);
        let command = 'INSERT INTO ' + this.constructor.name + " VALUES ";
        command += "(" + new Array(vals.length).fill("?").join(", ") + ");";
        db.run(command, vals, function(err) {
            if (err) {
                console.log(err.message);
            }
            // get the last insert id
        });
    }

    static get(db, attributs) {

        let command = "SELECT * FROM " + table;
        let keys = Object.keys(attributs);
        let added = false;

        keys.forEach(function (key) {

            if(Object.keys(this).contains(key)){
                if(!added){
                    added = true;
                    command += " WHERE ";
                }

                if(Array.isArray(attributs.key)){
                    attributs.key.forEach(function (elem) {
                        command += key + "==" + elem + ", ";
                        }
                    )

                }else{
                    command += key + "==" + attributs.key + ", ";
                }
            }
        });

        if(added){
            command = command.substr(0, command.length-2);
        }
        command += ";";


        db.run(command, function(err, rows) {
            //error
            if (err) {
                console.log(err.message);
            }
            rows.forEach((row) => {
                console.log(row.name);
            });

        });

    }

}

module.exports = DBObject;