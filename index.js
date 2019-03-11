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

    // Découpage des données en tableaux, pour ceux contenant une suite de valeurs séparés par des virgules
    for (let key in request) {
        if(request[key].indexOf(",") > -1) request[key] = request[key].split(",");
    }


    if(request["activite"] === "true") resultat_requete["activite"] = Activite.get(db, request);
    if(request["equipement"] === "true") resultat_requete["equipement"] = Activite.get(db, request);
    if(request["installation"] === "true") resultat_requete["installation"] = Activite.get(db, request);

    if(request["activite"] === "false" && request["equipement"] === "false" && request["installation"] === "false"){
        resultat_requete["activite"] = Activite.get(db, request);
        console.log(Activite.get(db, request));
        console.log("");
        resultat_requete["equipement"] = Equipement.get(db, request);
        console.log(Equipement.get(db, request));
        console.log("");
        resultat_requete["installation"] = Installation.get(db, request);
        console.log(Installation.get(db, request));
        console.log("");
    }

    console.log(resultat_requete);

    res.send(resultat_requete);
});

app.listen(8080);