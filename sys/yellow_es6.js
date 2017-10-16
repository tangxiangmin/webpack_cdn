
var $ = require("jquery")

var yellowify = function(el){
    $(el).css("color", "yellow");
}


export default yellowify;

export const test = function(){
    console.log("this is es6 test");
}