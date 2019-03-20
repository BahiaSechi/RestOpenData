const app = new Vue({
    el: '#affichage',
    data: {
        activites: [],
        installations: [],
        equipements: []
    },
    methods: {
        search: function() {
            let reqParams = [];

            let recherche = this.$refs.textSelector.val();
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

            let result;

            fetch(url + "api?" + reqParams.join("&"))
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));

            if (result !== undefined) {

                if (result.activite !== undefined && result.activite !== {}) {
                    app.activites = result.activite;
                } else {
                    app.activites = [];
                }

                if (result.equipement !== undefined && result.equipement !== {}) {
                    app.equipements = result.equipement;
                } else {
                    app.equipements = [];
                }

                if (result.installation !== undefined && result.installation !== {}) {
                    app.installations = result.installation;
                } else {
                    app.installations = [];
                }

            }
        }
    }
});

//returns the url of the current page
const url = window.location.href;

$('.submit').click();




