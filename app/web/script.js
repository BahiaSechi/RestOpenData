String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

const app = new Vue({
    el: "#affichage",
    
    data: {
        result: [],
        no_result: false,
        
        activites: [],
        installations: [],
        
        filtres: {},
        show: {}
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
                
                // Create filter
                this.addKeysToFilter(result);
    
                this.no_result = false;
            } else {
                this.activites = [];
                this.installations = [];
                
                this.no_result = true;
            }
            
            // Reset open lists
            for (let key in this.show) {
                this.$set(this.show, key, false);
            }
        },
        
        derouler: function(nom) {
            this.$set(this.show, nom, !this.show[nom]);
        },
        
        addKeysToFilter(arr) {
            for (let obj of arr)
                for (let key in obj) {
                    if (!Array.isArray(obj[key])) {
                        if (!["codePostal", "numVoie", "nomVoie", "lieuDit", "nom"].includes(key))
                            if (this.filtres[key] == null)
                                this.$set(this.filtres, key, [obj[key]]);
                            else if (!this.filtres[key].includes(obj[key]))
                                this.$set(this.filtres, key, [...this.filtres[key], obj[key]]);
                    } else {
                        this.addKeysToFilter(obj[key]);
                    }
                }
        }
    }
});

//returns the url of the current page
const url = window.location.href;



