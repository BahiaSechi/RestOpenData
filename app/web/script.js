String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

const app = new Vue({
    el: '#affichage',
    data: {
        activites: [1],
        installations: [2],
        equipements: [3]
    },
    methods: {
        search: async function () {
            let reqParams = [];

            let codePostal = this.$refs.codePostal.value;
            if (codePostal !== "") reqParams.push(`codePostal=${codePostal}`);

            let region = this.$refs.region.value;
            if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);

            ["installation", "equipement", "activite"].forEach(name => {
                if (this.$refs[name].checked)
                    reqParams.push(name);
            });

            let recherche = this.$refs.recherche.value;

            let result = {}, promises = [];

            ["installation", "equipement", "activite"].forEach(async name => {
                if (reqParams.includes(name)) {
                    let reqUrl = url + "api?" + [...reqParams, `q${(name === "equipement" ? "Equip" : name.capitalize())}=${recherche}`].join("&");
                    console.log(reqUrl);
                    let prom = fetch(reqUrl)
                        .then(res => res.json())
                        .then(res => res[name])
                        .catch(err => console.error(err));

                    promises.push(prom);

                    result[name] = await prom;
                }
            });

            await Promise.all(promises);

            console.log(result);

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



