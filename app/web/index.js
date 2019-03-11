$(document).ready(function() {

    const url = window.location.href;
    //returns the url of the current page

    $('.submit').click(function (e) {
        e.preventDefault();
        let recherche = $('.recherche').val();
        let region = $('.region').val();
        let ville_cp = $('.ville_cp').val();
        let installation = $('.installation').is(':checked');;
        let equipement = $('.equipement').is(':checked');;
        let activite = $('.activite').is(':checked');
        console.log(url+'/?=recherche='+recherche+'&region='+region+'&ville_cp='+ville_cp+'&installation='+installation +'&equipement='+equipement+'&activite='+activite);
    });


    /*
    fetch(window.location).then(response => {
        //Gestion de l'erreur 404
        if (response.ok) {
            response.json()
                .then(console.log);
        } else {
            console.error('server response : ' + response.status);
        }})

        .then(data => {
        // Work with JSON data here


        console.log(data);
    }).catch(err => {
        console.log('Les données ne peuvent pas être affichées.');
    });*/

});