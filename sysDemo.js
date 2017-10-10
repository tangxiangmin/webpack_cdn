import SystemJS from "./systemjs.config"

console.time("sc");

SystemJS.import('jquery').then($=>{
    console.timeEnd("sc");
    // 依赖CDN模块的模块只能通过CommonJS来调用
    var yellow = require("./sys/yellow");

    // 报错
    // import yellow from "./sys/yellow_es6"

    yellow.yellowify("#test");
   
})

