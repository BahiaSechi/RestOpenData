const DBObject = require("./DBObject");

class Activite extends DBObject {
    constructor(idEquip, nomact, niveau) {
        super();

        this.idEquip = idEquip;
        this.nomact = nomact;
        this.niveau = niveau;
    }

    static csvNames() {
        return ["Numéro de la fiche équipement", "Activité libellé", "Niveau de l'activité - Classif."];
    }
}

module.exports = Activite;