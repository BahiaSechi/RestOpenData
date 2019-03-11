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
        let args = "CREATE TABLE " + this.name + "(";
        for (let i of constrArgs(this)) {
            args += i + " text,";
        }
        args = args.substr(0, args.length - 1);
        args += ");";
        db.run(args);
    }

    insert(db) {
        //console.log("first");
        let vals = Object.values(this);
        let command = 'INSERT INTO ' + this.constructor.name + " VALUES ";
        command += "(" + new Array(vals.length).fill("?").join(", ") + ");";
        db.run(command, vals, function (err) {
            if (err) {
                console.log(err.message);
            }
            // get the last insert id
        });
    }

    static get(db, attributs = {}) {

        let command = "SELECT * FROM " + this.name;
        let keys = Object.keys(attributs);
        let added = false;
        let statement_args = [];

        // Pour chaque clé des attributs passés en paramètre
        keys.forEach((key) => {

            // Si l'objet actuel possède cette clé d'attribut
            if (constrArgs(this).includes(key)) {

                // si il n'y a pas encore eu d'ajouts on concatène le "WHERE"
                if (!added) {
                    added = true;
                    command += " WHERE ";
                }

                // Si l'on a affaire à un tableau d'attributs
                if (Array.isArray(attributs[key])) {
                    // Pour chaque valeur du tableau on concatène les "OR"
                    attributs[key].forEach(function (elem) {
                        command += key + "=? OR ";
                        statement_args.push(elem);
                    });
                    command = command.substr(0, command.length - 3) + "AND ";
                } else {
                    //Si il l'attribut n'est pas un tableau on le rajoute une seule fois
                    command += key + "=? AND ";
                    statement_args.push(attributs[key]);
                }
            }
        });


        if (added) {
            command = command.substr(0, command.length - 5);
        }
        command += ";";

        console.log(command);
        db.all(command, statement_args, function (err, rows) {
            //error
            if (err) {
                console.log(err);
            }
            return(rows);

        });

    }

}

module.exports = DBObject;