$(document).ready(function() {

    //returns the url of the current page
    const url = window.location.href;

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

});