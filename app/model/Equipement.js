const DBObject = require("./DBObject");

class Equipement extends DBObject {
    constructor(id, idInstallation, code, sol, interieur) {
        super();

        this.id = id;
        this.idInstallation = idInstallation;
        this.code = code;
        this.sol = sol;
        this.interieur = interieur;
    }

    static csvNames() {
        return ["Numéro de la fiche équipement", "Numéro de l'installation", "Type d'équipement_Code",
            "Libellé de la nature du sol", "Etablissement de plein air"];
    }
}

module.exports = Equipement;