
import "../require.config"

define("apiTest", ['axios'], function(axios){

    return {
        index: function(){
            return axios.get("/api.php").then(res=>res.data)
        }
    }

})