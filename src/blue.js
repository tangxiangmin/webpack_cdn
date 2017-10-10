
import "../require.config"

define("blue", ['jquery', 'layer'], function($){

    var blueify = function(el){
        $(el).css("color", "blue");
    }

    var msg = function(el){
        $(el).on("click", function(){
            layer.confirm($(this).text());
        })
    }
    
    return {
        blueify,
        msg
    }    
})
