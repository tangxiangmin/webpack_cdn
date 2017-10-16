import SystemJS from "./systemjs.config"
// import SystemJS from "systemjs"

import common from "./sys/common"

// console.log("wait 2s...");
  
common.then(res=>{
    console.timeEnd("all");
    console.time("all");
    var mod_1 = require("./sys/mod_1.js");
    var mod_2 = require("./sys/yellow_es6");
    console.log(mod_2.default);
    console.log(mod_2);
    mod_1.test();
})

