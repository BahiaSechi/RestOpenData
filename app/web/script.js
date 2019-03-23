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

            /*let region = this.$refs.region.value;
            if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);*/

            let result = null;
            
            if (this.$refs.installation.checked)
                result = fetch(url + "api/installations?" + reqParams.join("&"));
            else
                result = fetch(url + "api/activites?" + reqParams.join("&"));

            result = await result.then(res => res.json());
            
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



