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

            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.substr(1);
            };

            $('.submit').click(async (e) => {
                e.preventDefault();

                reqParams = [];

                let codePostal = $('.ville_cp').val();
                if (codePostal !== "") reqParams.push(`codePostal=${codePostal}`);

                let region = $('.region').val();
                if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);

                ["installation", "equipement", "activite"].forEach(name => {
                    if ($(`.${name}`).is(':checked'))
                        reqParams.push(name);
                });

                let recherche = $('.recherche').val();

                let result = {}, promises = [];

                ["installation", "equipement", "activite"].forEach(async name => {
                    if (reqParams.includes(name)) {
                        let prom = fetch(url + "api?" + [...reqParams, `q${(name === "equipement" ? name.capitalize() : "Equip")}=${recherche}`].join("&"))
                            .then(res => res.json())
                            .then(res => res[name])
                            .catch(err => console.error(err));

                        promises.push(prom);

                        result.push(await prom);
                    }
                });

                await Promise.all(promises);

                console.log(data);
            });

            let result;
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



