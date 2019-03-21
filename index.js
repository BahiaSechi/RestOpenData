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

app.get("/api/installations", async function(req, res) {
    let query = req.query;
    
    // Récupérer les installations (avec la recherche)
    let result = await Installation.get(db, query);
    
    // Suppression de la recherche pour la suite
    delete query.q;
    
    // Récupération des équipements (et filtrage des ids)
    let equipements = (await Equipement.get(db, query)).filter(equip => result.map(inst => inst.id).includes(equip.idInstallation));
    
    // Récupération des activités (et filtrage des ids)
    let activites = (await Activite.get(db, query)).filter(act => equipements.map(equip => equip.id).includes(act.idEquip));
    
    // Intégration des activités dans les équipements
    for (let i = 0; i < equipements.length; i++)
        equipements[i].activites = activites.filter(act => act.idEquip === equipements[i].id);
    
    // Intégration des équipements dans les installations
    for (let i = 0; i < result.length; i++)
        result[i].equipements = equipements.filter(equip => equip.idInstallation === result[i].id);
    
    // Envoi du résultat
    res.send(JSON.stringify(result));
});

app.get("/api/activites", async function(req, res) {
    let query = req.query;
    
    // Récupérer les activités (avec la recherche)
    let result = await Activite.get(db, query);
    
    // Suppression de la recherche pour la suite
    delete query.q;
    
    // Récupération des équipements (et filtrage des ids)
    let equipements = (await Equipement.get(db, query)).filter(equip => result.map(act => act.idEquip).includes(equip.id));
    
    // Récupération des installations (et filtrage des ids)
    let installations = (await Installation.get(db, query)).filter(inst => equipements.map(equip => equip.idInstallation).includes(inst.id));
    
    // Intégration des installations dans les équipements
    for (let i = 0; i < equipements.length; i++)
        equipements[i].installation = installations.filter(inst => inst.id === equipements[i].idInstallation);
    
    // Intégration des équipements dans les activités
    for (let i = 0; i < result.length; i++)
        result[i].equipement = equipements.filter(equip => equip.id === result[i].idEquip);
    
    // Envoi du résultat
    res.send(JSON.stringify(result));
});

app.listen(8080);