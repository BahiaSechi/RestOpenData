$(document).ready(function() {

    const url = window.location.href;
    //returns the url of the current page

    $('.submit').click(function (e) {
        e.preventDefault();

        reqParams = [];

        let recherche = $('.recherche').val();
        if (recherche !== "") reqParams.push(`q=${recherche}`);

        let codePostal = $('.ville_cp').val();
        if (codePostal !== "") reqParams.push(`codePostal=${codePostal}`);

        let region = $('.region').val();
        if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);

        if ($('.installation').is(':checked'))
            reqParams.push("installation");

        if ($('.equipement').is(':checked'))
            reqParams.push("equipement");

        if ($('.activite').is(':checked'))
            reqParams.push("activite");

        fetch(url + "api?" + reqParams.join("&"))
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err));
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