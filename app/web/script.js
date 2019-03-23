String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

const app = new Vue({
    el: "#affichage",
    data: {
        activites: [],
        installations: [],
        filtres: {},
        show: {},
        no_result: false
    },
    methods: {
        search: async function() {
            let reqParams = [];
            
            let codePostal = this.$refs.codePostal.value;
            if (codePostal !== "") reqParams.push(`codePostal=${codePostal}`);
            
            let recherche = this.$refs.recherche.value;
            if (recherche !== "") reqParams.push(`q=${recherche}`);
            
            /*let region = this.$refs.region.value;
            if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);*/
            
            let reqUrl = url + "api/" + (this.$refs.installation.checked ? "installations" : "activites") + "?" + reqParams.join("&");
            let result = await fetch(reqUrl).then(res => res.json());
            
            if (result.length > 0) {
                if (result[0].nomact === undefined) {
                    //console.log(result[0].nomact);
                    this.installations = result;
                    this.activites = [];
                } else {
                    this.activites = result;
                    this.installations = [];
                }
    
                this.no_result = false;
            } else {
                this.activites = [];
                this.installations = [];
                
                this.no_result = true;
            }
        },
        derouler: function(nom) {
            this.$set(this.show, nom, !this.show[nom]);
        }
    }
});

//returns the url of the current page
const url = window.location.href;



