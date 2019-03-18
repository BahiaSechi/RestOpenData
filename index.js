const Activite = require("./app/model/Activite");
const Equipement = require("./app/model/Equipement");
const Installation = require("./app/model/Installation");

const sqlite = require('sqlite3');
const express = require('express');
const app = express();

let db = new sqlite.Database('./sqlite.db');

app.get('/', async function (req, res) {

    let resultat_requete = {};

    // Récuperation des attributs de la requete
    let request = req.query;

    // Découpage des données en tableaux, pour ceux contenant une suite de valeurs séparés par des virgules
    for (let key in request) {
        if(request[key].indexOf(",") > -1) request[key] = request[key].split(",");
    }

    let all = request.activite === "false" && request.equipement === "false" && request.installation === "false";

    if(request.activite === "true" || all)
        resultat_requete.activite = await Activite.get(db, request);

    if(request.equipement === "true" || all)
        resultat_requete.equipement = await Equipement.get(db, request);

    if(request.installation === "true" || all)
        resultat_requete.installation = await Installation.get(db, request);

    res.send(JSON.stringify(resultat_requete));
});

app.listen(8080);