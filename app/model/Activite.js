const DBObject = require("./DBObject");

class Activite extends DBObject {
    constructor(idEquip, code, nomact, niveau) {
        super();

        this.idEquip = idEquip;
        this.code = code;
        this.nomact = nomact;
        this.niveau = niveau;
    }

    static csvNames() {
        return ["Numéro de la fiche équipement", "Activité code", "Activité libellé",
            "Niveau de l'activité - Classif."];
    }
}

module.exports = Activite;