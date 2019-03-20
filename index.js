const Activite = require("./app/model/Activite");
const Equipement = require("./app/model/Equipement");
const Installation = require("./app/model/Installation");

require("./app/util");

const sqlite = require('sqlite3');
const express = require('express');
const app = express();

let db = new sqlite.Database('./sqlite.db');

app.use(express.static("app/web/"));

app.get('/', function(req, res) {
    res.sendFile("index.html")
});

app.get("/api/", async function(req, res) {
    let resultat_requete = {};

    // Récuperation des attributs de la requete
    let request = req.query;

    // Découpage des données en tableaux, pour ceux contenant une suite de valeurs séparés par des virgules
    for (let key in request) {
        if (request.hasOwnProperty(key))
            if (request[key].indexOf(",") > -1)
                request[key] = request[key].split(",");
    }

    // Installations
    let reqInst = request.copy();

    if (reqInst.idInstallation) reqInst.id = reqInst.idInstallation;
    if (reqInst.qInstallation) reqInst.q = reqInst.qInstallation;

    let inst = await Installation.get(db, reqInst);

    if (request.installation != null)
        resultat_requete.installation = inst;

    request.idInstallation = inst.map(i => i.id);

    // Equipements
    let reqEquip = request.copy();

    if (reqEquip.idEquip) reqEquip.id = reqEquip.idEquip;
    if (reqEquip.qEquip) reqEquip.q = reqEquip.qEquip;

    let equip = await Equipement.get(db, reqEquip);

    if (request.equipement != null)
        resultat_requete.equipement = equip;

    request.idEquip = equip.map(i => i.id);

    if (request.qActivite) request.q = request.qActivite;

    // Activités
    if (request.activite != null)
        resultat_requete.activite = await Activite.get(db, request);

    res.send(JSON.stringify(resultat_requete));
});

app.listen(8080);