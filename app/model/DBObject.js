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
            if (constrArgs(this).includes(key) || key === "q") {
                // si il n'y a pas encore eu d'ajouts on concatène le "WHERE"
                if (!added) {
                    added = true;
                    command += " WHERE ";
                }

                if (constrArgs(this).includes(key)) {
                    // Si l'on a affaire à un tableau d'attributs
                    if (Array.isArray(attributs[key])) {
                        if (attributs[key].length > 0) {
                            // Pour chaque valeur du tableau on concatène les "OR"
                            command += "(";
                            attributs[key].forEach(elem => {
                                command += key + "=? OR ";
                                statement_args.push(elem);
                            });
                            command = command.substr(0, command.length - 4) + ") AND ";
                        }
                    } else {
                        // Si l'attribut n'est pas un tableau on le rajoute une seule fois
                        command += key + "=? AND ";
                        statement_args.push(attributs[key]);
                    }

                } else { // q
                    command += "(";
                    for (let col of constrArgs(this)) {
                        if (Array.isArray(attributs.q)) {
                            attributs.q.forEach(elem => {
                                command += col + " LIKE ? OR ";
                                statement_args.push(`%${elem}%`);
                            });
                        } else {
                            command += col + " LIKE ? OR ";
                            statement_args.push(`%${attributs.q}%`);
                        }
                    }
                    command = command.substr(0, command.length - 4) + ") AND ";
                }
            }
        });

        if (added) {
            command = command.substr(0, command.length - 5);
        }
        command += ";";

        return new Promise((res, rej) => {
            db.all(command, statement_args, (err, rows) => {
                if (err) rej(err);
                res(rows);
            });
        });
    }
}

module.exports = DBObject;