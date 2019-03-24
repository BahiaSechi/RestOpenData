const DBObject = require("./DBObject");

class Installation extends DBObject {
    constructor(id, nom, codePostal, numVoie, nomVoie, lieuDit, accesHandicap, wifi) {
        super();

        this.id = id;
        this.nom = nom;
        this.codePostal = codePostal;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.lieuDit = lieuDit;
        this.accesHandicap = accesHandicap;
        this.wifi = wifi;
    }

    static csvNames() {
        return ["Numéro de l'installation", "Nom usuel de l'installation", "Code postal",
            "Numero de la voie", "Nom de la voie", "Nom du lieu dit",
            "Accessibilité handicapés à mobilité réduite", "Présence d'un internet"];
    }
}

module.exports = Installation;