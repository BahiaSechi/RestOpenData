const DBObject = require("./DBObject");

class Equipement extends DBObject {
    constructor(id, idInstallation, nom, type, sol, interieur) {
        super();

        this.id = id;
        this.idInstallation = idInstallation;
        this.nom = nom;
        this.type = type;
        this.sol = sol;
        this.interieur = interieur;
    }

    static csvNames() {
        return ["Numéro de la fiche équipement", "Numéro de l'installation", "Equipement",
            "Type d'équipement", "Libellé de la nature du sol", "Etablissement de plein air"];
    }
}

module.exports = Equipement;