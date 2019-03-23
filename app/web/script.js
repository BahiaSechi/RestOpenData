String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

const app = new Vue({
    el: '#affichage',
    data: {
        activites: [],
        installations: []
    },
    methods: {
        search: async function () {
            let reqParams = [];

            let codePostal = this.$refs.codePostal.value;
            if (codePostal !== "") reqParams.push(`codePostal=${codePostal}`);
    
            let recherche = this.$refs.recherche.value;
            if (recherche !== "") reqParams.push(`q=${recherche}`);
            
            /*let region = this.$refs.region.value;
            if (region !== "" && codePostal === "") reqParams.push(`region=${region}`);*/

            let result = null;
            
            let reqUrl = url + "api/" + (this.$refs.installation.checked ? "installations" : "activites") + "?" + reqParams.join("&");
            
            result = await fetch(reqUrl).then(res => res.json());
            
            console.log(reqUrl);
            //console.log(result);

            if (result !== undefined && result !== []) {
                console.log("result !");
                console.log(result[0]);

                if(result[0].nomact === undefined){
                    //console.log(result[0].nomact);
                    app.installations = result;
                    app.activites = [];
                }else {
                    app.activites = result;
                    app.installations = [];
                }
            }else{
                console.log("nope !");
                app.activites = [];
                app.installations = [];
            }
        }
    }
});

//returns the url of the current page
const url = window.location.href;



