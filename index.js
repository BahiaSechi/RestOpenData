const Activite = require("./app/model/Activite");
const Equipement = require("./app/model/Equipement");
const Installation = require("./app/model/Installation");

const sqlite = require('sqlite3');
const express = require('express');
const app = express();

let db = new sqlite.Database('./sqlite.db');

app.get('/', function (req, res) {

    let resultat_requete = {};

    // Récuperation des attributs de la requete
    let request = req.query;
    console.log(request);
    // Récuperation des clés des attributs
    let keys = Object.keys(request);

    // Découpage des données en tableaux, pour ceux contenant une suite de valeurs séparés par des virgules
    for (let requestKey in keys) {
        if(request[requestKey].indexOf(",") > -1) request[requestKey] = request[requestKey].split(",");
    }

    if(request["activite"] === "true") resultat_requete["activite"] = Activite.get(db, request);
    if(request["equipement"] === "true") resultat_requete["equipement"] = Activite.get(db, request);
    if(request["installation"] === "true") resultat_requete["installation"] = Activite.get(db, request);

    if(request["activite"] === "false" && request["equipement"] === "false" && request["installation"] === "false"){
        resultat_requete["activite"] = Activite.get(db, request);
        resultat_requete["equipement"] = Equipement.get(db, request);
        resultat_requete["installation"] = Installation.get(db, request);
    }



    res.send(resultat_requete);
});

app.listen(8080);